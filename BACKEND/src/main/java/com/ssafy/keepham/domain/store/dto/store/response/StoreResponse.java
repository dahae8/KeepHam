package com.ssafy.keepham.domain.store.dto.store.response;

import com.ssafy.keepham.domain.store.entity.Store;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StoreResponse {
    Long id;
    String category;
    int storeId;
    String name;
    String address;
    String estimatedDeliveryTime;
    String minOrderAmount;
    String deliveryFeeToDisplay;
    String logoUrl;
    String thumbnailUrl;
    float lat;
    float lng;

    public static StoreResponse from(Store store){
        return new StoreResponse(
                store.getId(),
                store.getCategory(),
                store.getStoreId(),
                store.getName(),
                store.getAddress(),
                store.getEstimatedDeliveryTime(),
                store.getMinOrderAmount(),
                store.getDeliveryFeeToDisplay(),
                store.getLogoUrl(),
                store.getThumbnailUrl(),
                store.getLat(),
                store.getLng()
        );
    }
}
