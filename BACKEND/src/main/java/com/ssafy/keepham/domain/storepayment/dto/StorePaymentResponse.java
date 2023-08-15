package com.ssafy.keepham.domain.storePayment.dto;

import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StorePaymentResponse {

    private Long roomId;
    //체팅방 번호

    private String userNickName;
    //유저 닉네임

    private String store;
    //가게명

    private String menu;
    //메뉴명

    private int count;
    //개수

    private int price;
    //가격
}
