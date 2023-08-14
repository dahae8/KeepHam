package com.ssafy.keepham.domain.storePayment.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@EqualsAndHashCode
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "StorePayment")
public class StorePayment {

    //키값
    @Id
    private String id;

    //체팅방 번호
    private Long roomId;

    //유저 닉네임
    private String userNickName;

    //가게명
    private String store;

    //메뉴명
    private String menu;

    //개수
    private int count;

    //가격
    private int price;

}
