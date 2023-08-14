package com.ssafy.keepham.domain.storePayment.dto;

import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConfirmSuperIdRequest {

    private Long roomId;
    //체팅방 번호

    private int dividedDeliveryfee;
    //분배된 배달비 가격
}
