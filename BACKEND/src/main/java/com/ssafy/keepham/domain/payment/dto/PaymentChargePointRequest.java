package com.ssafy.keepham.domain.payment.dto;

import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentChargePointRequest {
    @JsonSetter("price")
    private int price;
    //금액

    @JsonSetter("receiptId")
    private String receiptId;
    //영수증 번호
}
