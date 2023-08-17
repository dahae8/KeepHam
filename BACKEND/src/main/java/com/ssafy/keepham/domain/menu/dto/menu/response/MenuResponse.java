package com.ssafy.keepham.domain.menu.dto.menu.response;

import com.ssafy.keepham.domain.menu.entity.Menu;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MenuResponse {
    Long item;
    Integer storeId;
    String originalImage;
    Integer reviewCount;
    String subtitle;
    String description;
    Integer price;
    String slug;
    String image;
    String section;
    Integer topDisplayedItemOrder;
    String reorderRateMessage;
    Integer menuSetId;
    Integer id;
    String name;
    public static MenuResponse from(Menu menu){
        return new MenuResponse(
                menu.getItemId(),
                menu.getStoreId(),
                menu.getOriginalImage(),
                menu.getReviewCount(),
                menu.getSubtitle(),
                menu.getDescription(),
                menu.getPrice(),
                menu.getSlug(),
                menu.getImage(),
                menu.getSection(),
                menu.getTopDisplayedItemOrder(),
                menu.getReorderRateMessage(),
                menu.getMenuSetId(),
                menu.getId(),
                menu.getName()
        );
    }
}
