package com.ssafy.keepham.domain.storepayment.dto;

import lombok.*;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StorePaymentUserResponse {
    private Long roomId;
    //체팅방 번호

    private String userNickName;
    //가게명

    private List<UserMenuPrice> menus;
    //목록
}
