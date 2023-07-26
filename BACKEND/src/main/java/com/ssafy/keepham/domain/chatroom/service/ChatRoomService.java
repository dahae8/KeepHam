package com.ssafy.keepham.domain.chatroom.service;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.chatroom.db.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.db.ChatRoomRepository;
import com.ssafy.keepham.domain.chatroom.db.enums.ChatRoomStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    public ChatRoomEntity createRoom(ChatRoomEntity chatRoomEntity){
        return Optional.ofNullable(chatRoomEntity)
                .map(it -> {
                    chatRoomEntity.setCreatedAt(LocalDateTime.now());
                    chatRoomEntity.setStatus(ChatRoomStatus.OPEN);
                    return chatRoomRepository.save(chatRoomEntity);
                })
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST));
    }

    public List<ChatRoomEntity> openedRoom(){
        var roomList = chatRoomRepository.findAllByStatusOrderByCreatedAtDesc(ChatRoomStatus.OPEN);
        return roomList;
    }
}
