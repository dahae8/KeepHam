package com.ssafy.keepham.domain.chatroom.service;

import com.ssafy.keepham.common.error.BoxError;
import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.box.dto.BoxResponse;
import com.ssafy.keepham.domain.box.entity.Box;
import com.ssafy.keepham.domain.box.repository.BoxRepository;
import com.ssafy.keepham.domain.box.service.BoxService;
import com.ssafy.keepham.domain.chatroom.converter.ChatRoomConverter;
import com.ssafy.keepham.domain.chatroom.entity.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomRequest;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomResponse;
import com.ssafy.keepham.domain.chatroom.repository.ChatRoomRepository;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.user.repository.UserRepository;
import com.ssafy.keepham.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomConverter chatRoomConverter;
    private final ChatRoomManager chatRoomManager;
    private final BoxRepository boxRepository;
    private final BoxService boxService;
    private final UserRepository userRepository;
    private Authentication auth;

    @Transactional
    public ChatRoomResponse createRoom(ChatRoomRequest chatRoomRequest){
        var entity = chatRoomConverter.toEntity(chatRoomRequest);
        var box = boxRepository.findFirstById(chatRoomRequest.getBoxId());
        if (box.isUsed()) {
            throw new ApiException(ErrorCode.BAD_REQUEST, "이미 사용중인 box입니다.");
        }
        box.setUsed(true);
        entity.setBox(box);
        return Optional.ofNullable(entity)
                .map(it -> {
                    entity.setStatus(ChatRoomStatus.OPEN);
                    chatRoomRepository.save(entity);
                    return chatRoomConverter.toResponse(entity);
                })
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST));
    }

    public List<ChatRoomResponse> openedRoom(ChatRoomStatus status, int page, int pageSize){
        Pageable pageable = PageRequest.of(page-1, pageSize);
        Page<ChatRoomEntity> chatRoomEntityPage = chatRoomRepository.findAllByStatusOrderByCreatedAtDesc(status, pageable);

        List<ChatRoomEntity> chatRooms = chatRoomEntityPage.getContent();
        return chatRooms.stream().map(chatRoomConverter::toResponse)
                .map(it -> {
                    var currentNumber = chatRoomManager.getUserCountInChatRoom(it.getId());
                    it.setCurrentPeopleNumber(currentNumber);
                    return it;
                })
                .collect(Collectors.toList());
    }

    public List<ChatRoomResponse> findOpenedRoomByBoxId(ChatRoomStatus status, int page, int pageSize, Long boxId){
        Pageable pageable = PageRequest.of(page-1, pageSize);
        Box box = boxRepository.findFirstById(boxId);
        Page<ChatRoomEntity> chatRoomEntityPage = chatRoomRepository.findAllByStatusAndBoxOrderByCreatedAtDesc(status, box, pageable);

        List<ChatRoomEntity> chatRooms = chatRoomEntityPage.getContent();
        return chatRooms.stream().map(chatRoomConverter::toResponse)
                .map(it -> {
                    var currentNumber = chatRoomManager.getUserCountInChatRoom(it.getId());
                    it.setCurrentPeopleNumber(currentNumber);
                    return it;
                })
                .collect(Collectors.toList());
    }

    public List<ChatRoomResponse> findAllRoomByZipCode(ChatRoomStatus status, int page, int pageSize, String zipCode){
        Pageable pageable = PageRequest.of(page-1, pageSize);
        Page<ChatRoomEntity> chatRoomEntityPage = chatRoomRepository.findAllByStatusAndBox_ZipCodeOrderByCreatedAtDesc(status, zipCode, pageable);
        System.out.println(chatRoomEntityPage.getContent());
        List<ChatRoomEntity> chatRooms = chatRoomEntityPage.getContent();
        return chatRooms.stream().map(chatRoomConverter::toResponse)
                .collect(Collectors.toList());
    }

    // 채팅방 상태 close로 변경
    @Transactional
    public void closeRoom(Long roomId){
        var room = chatRoomRepository.findFirstByIdAndStatus(roomId, ChatRoomStatus.OPEN);
        room.getBox().setUsed(false);
        room.setStatus(ChatRoomStatus.CLOSE);
    }


    public String getUserNickname(){
        auth = SecurityContextHolder.getContext().getAuthentication();
        var user = (User)auth.getPrincipal();
        var userId = user.getUsername();
        log.info("user : {}", user.getUsername());
        var userNickName = userRepository.findByUserId(userId).map(it -> it.getNickName())
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST, "존재하지 않는 유저입니다."));
//        var userNickName = "1";
        return userNickName;
    }




}
