package com.ssafy.keepham.domain.store.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long index;
    String category;
    int storeId;
    String name;
    String address;
    String estimatedDeliveryTime;
    String deliveryFeeToDisplay;
    String logoUrl;
    float lat;
    float lng;
}
