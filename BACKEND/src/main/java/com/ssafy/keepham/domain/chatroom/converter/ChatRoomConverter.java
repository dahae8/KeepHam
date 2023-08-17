package com.ssafy.keepham.domain.chatroom.converter;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.box.convert.BoxConvert;
import com.ssafy.keepham.domain.box.repository.BoxRepository;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomCategoryResponse;
import com.ssafy.keepham.domain.chatroom.entity.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomRequest;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomResponse;
import com.ssafy.keepham.domain.store.entity.Store;
import com.ssafy.keepham.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ChatRoomConverter {

    private final BoxConvert boxConvert;
    private final StoreRepository storeRepository;

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
                            .locked(chatRoomRequest.isLocked())
                            .password(chatRoomRequest.getPassword())
                            .build();
                }).orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT));
    }

    public ChatRoomResponse toResponse(
            ChatRoomEntity chatRoomEntity
    ){
        var storeName = Optional.ofNullable(storeRepository.findFirstByStoreId(chatRoomEntity.getStoreId()))
                .map(Store::getName)
                .orElseThrow(()-> new ApiException(ErrorCode.BAD_REQUEST, "존재하지 않은 가게입니다."));
        return Optional.ofNullable(chatRoomEntity)
                .map(it -> {
                    return ChatRoomResponse.builder()
                            .id(chatRoomEntity.getId())
                            .title(chatRoomEntity.getTitle())
                            .status(chatRoomEntity.getStatus())
                            .storeId(chatRoomEntity.getStoreId())
                            .storeName(storeName)
                            .box(boxConvert.toResponse(chatRoomEntity.getBox()))
                            .extensionNumber(chatRoomEntity.getExtensionNumber())
                            .maxPeopleNumber(chatRoomEntity.getMaxPeopleNumber())
                            .superUserId(chatRoomEntity.getSuperUserId())
                            .locked(chatRoomEntity.isLocked())
                            .createdAt(chatRoomEntity.getCreatedAt())
                            .updatedAt(chatRoomEntity.getUpdatedAt())
                            .closedAt(chatRoomEntity.getClosedAt())
                            .step(chatRoomEntity.getStep())
                            .build();

                }).orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT));

    }

    public ChatRoomCategoryResponse toCategoryResponse(
            ChatRoomEntity chatRoomEntity
    ){

        Store store = Optional.ofNullable(storeRepository.findFirstByStoreId(chatRoomEntity.getStoreId()))
                .orElseThrow(()-> new ApiException(ErrorCode.BAD_REQUEST, "존재하지 않은 가게입니다."));
        return Optional.ofNullable(chatRoomEntity)
                .map(it -> {
                    return ChatRoomCategoryResponse.builder()
                            .id(chatRoomEntity.getId())
                            .title(chatRoomEntity.getTitle())
                            .status(chatRoomEntity.getStatus())
                            .storeId(chatRoomEntity.getStoreId())
                            .storeName(store.getName())
                            .box(boxConvert.toResponse(chatRoomEntity.getBox()))
                            .extensionNumber(chatRoomEntity.getExtensionNumber())
                            .maxPeopleNumber(chatRoomEntity.getMaxPeopleNumber())
                            .superUserId(chatRoomEntity.getSuperUserId())
                            .locked(chatRoomEntity.isLocked())
                            .createdAt(chatRoomEntity.getCreatedAt())
                            .updatedAt(chatRoomEntity.getUpdatedAt())
                            .closedAt(chatRoomEntity.getClosedAt())
                            .category(store.getCategory())
                            .build();

                }).orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT));

    }
}
