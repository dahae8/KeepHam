package com.ssafy.keepham.domain.payment.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {

    private String info;
    //상세내역(충전, 환불, 가게명 등등)

    private long price;
    //금액

    private int totalPoint;
    //남은 잔액

    private LocalDateTime insertTime;
    //insert할때 시간

}
