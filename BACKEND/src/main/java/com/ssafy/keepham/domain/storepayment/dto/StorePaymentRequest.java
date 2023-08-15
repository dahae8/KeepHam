package com.ssafy.keepham.domain.storepayment.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StorePaymentRequest {

    private Long roomId;
    //체팅방 번호

    private String storeName;
    //가게명

    private List<UserMenuPrice> menus;
    //목록

}
