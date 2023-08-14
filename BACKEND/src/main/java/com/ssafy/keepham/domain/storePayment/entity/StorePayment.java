package com.ssafy.keepham.domain.storePayment.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@RedisHash(value = "StorePayment")
public class StorePayment {
    @Id
    private String id;

    //유저 닉네임
    private String userNickName;

    //체팅방 번호
    private Long roomId;

    //가게명
    private String store;

    //가격
    private int price;

    @Override
    public String toString() {
        return "StorePayment{" +
                "id='" + id + '\'' +
                ", userNickName='" + userNickName + '\'' +
                ", roomId=" + roomId +
                ", store='" + store + '\'' +
                ", price=" + price +
                '}';
    }
}
