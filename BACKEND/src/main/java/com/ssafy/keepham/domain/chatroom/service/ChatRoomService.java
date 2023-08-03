package com.ssafy.keepham.domain.chatroom.service;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.chatroom.converter.ChatRoomConverter;
import com.ssafy.keepham.domain.chatroom.entity.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomRequest;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomResponse;
import com.ssafy.keepham.domain.chatroom.repository.ChatRoomRepository;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import com.ssafy.keepham.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomConverter chatRoomConverter;
    private final ChatRoomManager chatRoomManager;
    private final TokenProvider tokenProvider;
    //TODO TokenProvider 유호성 검사 후 내부 정보에 맞춰 수정하기

    public ChatRoomResponse createRoom(ChatRoomRequest chatRoomRequest){
        var entity = chatRoomConverter.toEntity(chatRoomRequest);
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
        Page<ChatRoomEntity> chatRoomEntityPage = chatRoomRepository.findAllByStatusAndBoxIdOrderByCreatedAtDesc(status, boxId, pageable);

        List<ChatRoomEntity> chatRooms = chatRoomEntityPage.getContent();
        return chatRooms.stream().map(chatRoomConverter::toResponse)
                .map(it -> {
                    var currentNumber = chatRoomManager.getUserCountInChatRoom(it.getId());
                    it.setCurrentPeopleNumber(currentNumber);
                    return it;
                })
                .collect(Collectors.toList());
    }




}
