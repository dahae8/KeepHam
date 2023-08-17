package com.ssafy.keepham.domain.payment.dto;

import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRequest {
    @JsonSetter("userNickName")
    private String userNickName;
    //user의 닉네임

    @JsonSetter("info")
    private String info;
    //상세내역(충전, 환불, 가게명 등등)

    @JsonSetter("price")
    private long price;
    //금액

    @JsonSetter("type")
    private boolean type;
    //포인트 충전(true), 포인트 사용(false)

    @JsonSetter("updateTime")
    private LocalDateTime updateTime;
    //포인트 변경 시간

}
