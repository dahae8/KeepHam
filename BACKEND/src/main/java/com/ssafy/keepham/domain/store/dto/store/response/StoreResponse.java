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
    @Schema(description = "")
    Long id;
    @Schema(description = "")
    String category;
    @Schema(description = "")

    int storeId;
    @Schema(description = "")

    String name;
    @Schema(description = "")

    String address;
    @Schema(description = "")

    String estimatedDeliveryTime;
    @Schema(description = "")

    String deliveryFeeToDisplay;
    @Schema(description = "")

    String logoUrl;
    @Schema(description = "")

    float lat;
    @Schema(description = "")

    float lng;

    public static StoreResponse from(Store store){
        return new StoreResponse(
                store.getId(),
                store.getCategory(),
                store.getStoreId(),
                store.getName(),
                store.getAddress(),
                store.getEstimatedDeliveryTime(),
                store.getDeliveryFeeToDisplay(),
                store.getLogoUrl(),
                store.getLat(),
                store.getLng()
        );
    }
}
