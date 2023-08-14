package com.ssafy.keepham.domain.storePayment.dto;

import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StorePaymentRequest {

    private Long roomId;
    //체팅방 번호

    private String store;
    //가게명

    private int price;
    //가격

}