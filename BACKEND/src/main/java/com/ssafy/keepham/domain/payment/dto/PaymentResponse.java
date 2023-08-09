package com.ssafy.keepham.domain.payment.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {

    private long id;
    //키값

    private long userId;
    //user의 키값

    private long price;
    //금액

    private boolean type;
    //포인트 충전(true), 포인트 사용(false)

    private String info;
    //상세내역(충전, 환불, 가게명 등등)

    private LocalDateTime updateTime;
    //포인트 변경 시간

}
