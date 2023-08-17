package com.ssafy.keepham.domain.storePayment.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserMenuPrice {

    //메뉴명
    private String menu;
    //개수
    private int count;
    //가격
    private int price;
}
