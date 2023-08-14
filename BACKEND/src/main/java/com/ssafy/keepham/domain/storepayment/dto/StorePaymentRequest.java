package com.ssafy.keepham.domain.storepayment.dto;

import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StorePaymentRequest {

    @JsonSetter("roomId")
    private Long roomId;
    //체팅방 번호

    @JsonSetter("store")
    private String store;
    //가게명

    @JsonSetter("price")
    private int price;
    //가격

}
