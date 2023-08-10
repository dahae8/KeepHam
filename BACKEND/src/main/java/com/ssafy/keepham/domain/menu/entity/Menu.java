package com.ssafy.keepham.domain.menu.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/*
 item_id INT AUTO_INCREMENT PRIMARY KEY,
                store_id INT,
                original_image TEXT,
                review_count INT,
                subtitle VARCHAR(200),
                description TEXT,
                price INT,
                slug TEXT,
                image TEXT,
                section VARCHAR(100),
                top_displayed_item_order INT,
                reorder_rate_message VARCHAR(100),
                menu_set_id INT,
                id INT,
 */
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Menu {
    @Id
    @GeneratedValue
    Long itemId;

    @Column(name = "store_id")
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
}
