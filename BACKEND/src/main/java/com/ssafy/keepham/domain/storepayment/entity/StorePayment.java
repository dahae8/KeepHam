package com.ssafy.keepham.domain.storepayment.entity;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@RedisHash(value = "StorePayment", timeToLive = 10800)
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

    //가격
    private int price;


}
