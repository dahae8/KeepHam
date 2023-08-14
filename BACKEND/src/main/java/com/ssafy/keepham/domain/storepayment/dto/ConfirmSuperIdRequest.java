package com.ssafy.keepham.domain.storepayment.dto;

import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConfirmSuperIdRequest {

    @JsonSetter("roomId")
    private Long roomId;
    //체팅방 번호

    @JsonSetter("dividedDeliveryfee")
    private int dividedDeliveryfee;
    //분배된 배달비 가격
}
