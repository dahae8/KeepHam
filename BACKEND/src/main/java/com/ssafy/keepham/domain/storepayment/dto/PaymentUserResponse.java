package com.ssafy.keepham.domain.storepayment.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentUserResponse {

    private String userNickName;
    //user의 닉네임

    private String info;
    //상세내역(충전, 환불, 가게명 등등)

    private long price;
    //금액

    private int totalPoint;
    //남은 잔액

    private long chatroomId;
    //체팅방id( 충전,환불은 -1)

    private boolean agreement;
    //구매확정(true=>확정, false=> 확정전)(충전,환불은 true)
}
