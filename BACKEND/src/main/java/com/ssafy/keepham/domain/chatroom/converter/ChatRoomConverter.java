package com.ssafy.keepham.domain.chatroom.converter;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.box.repository.BoxRepository;
import com.ssafy.keepham.domain.chatroom.entity.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomRequest;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ChatRoomConverter {

    private final BoxRepository boxRepository;

    public ChatRoomEntity toEntity(
            ChatRoomRequest chatRoomRequest
    ){
        return Optional.ofNullable(chatRoomRequest)
                .map(it -> {
                    return ChatRoomEntity.builder()
                            .title(chatRoomRequest.getTitle())
                            .storeId(chatRoomRequest.getStoreId())
                            .extensionNumber(chatRoomRequest.getExtensionNumber())
                            .maxPeopleNumber(chatRoomRequest.getMaxPeopleNumber())
                            .superUserId(chatRoomRequest.getSuperUserId())
                            .locked(chatRoomRequest.isLocked())
                            .password(chatRoomRequest.getPassword())
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
                            .box(chatRoomEntity.getBox())
                            .extensionNumber(chatRoomEntity.getExtensionNumber())
                            .maxPeopleNumber(chatRoomEntity.getMaxPeopleNumber())
                            .superUserId(chatRoomEntity.getSuperUserId())
                            .locked(chatRoomEntity.isLocked())
                            .createdAt(chatRoomEntity.getCreatedAt())
                            .updatedAt(chatRoomEntity.getUpdatedAt())
                            .build();

                }).orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT));

    }
}
