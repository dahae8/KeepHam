package com.ssafy.keepham.domain.chatroom.service;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.chatroom.converter.ChatRoomConverter;
import com.ssafy.keepham.domain.chatroom.db.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomRequest;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomResponse;
import com.ssafy.keepham.domain.chatroom.repository.ChatRoomRepository;
import com.ssafy.keepham.domain.chatroom.db.enums.ChatRoomStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomConverter chatRoomConverter;

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

}
