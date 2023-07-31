package com.ssafy.keepham.domain.chatroom.converter;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.chatroom.db.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomRequest;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomResponse;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ChatRoomConverter {

    public ChatRoomEntity toEntity(
            ChatRoomRequest chatRoomRequest
    ){
        return Optional.ofNullable(chatRoomRequest)
                .map(it -> {
                    return ChatRoomEntity.builder()
                            .title(chatRoomRequest.getTitle())
                            .status(chatRoomRequest.getStatus())
                            .storeId(chatRoomRequest.getStoreId())
                            .boxId(chatRoomRequest.getBoxId())
                            .extensionNumber(chatRoomRequest.getExtensionNumber())
                            .type(chatRoomRequest.getType())
                            .maxPeopleNumber(chatRoomRequest.getMaxPeopleNumber())
                            .superUserId(chatRoomRequest.getSuperUserId())
                            .locked(chatRoomRequest.isLocked())
                            .build();
                }).orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT));
    }

    public ChatRoomResponse toResponse(
            ChatRoomEntity chatRoomEntity
    ){
        return Optional.ofNullable(chatRoomEntity)
                .map(it -> {
                    return ChatRoomResponse.builder()
                            .id(chatRoomEntity.getId())
                            .title(chatRoomEntity.getTitle())
                            .status(chatRoomEntity.getStatus())
                            .storeId(chatRoomEntity.getStoreId())
                            .boxId(chatRoomEntity.getBoxId())
                            .extensionNumber(chatRoomEntity.getExtensionNumber())
                            .type(chatRoomEntity.getType())
                            .maxPeopleNumber(chatRoomEntity.getMaxPeopleNumber())
                            .superUserId(chatRoomEntity.getSuperUserId())
                            .locked(chatRoomEntity.isLocked())
                            .build();

                }).orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT));

    }
}
