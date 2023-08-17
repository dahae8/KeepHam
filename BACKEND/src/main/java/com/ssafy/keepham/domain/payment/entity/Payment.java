package com.ssafy.keepham.domain.payment.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "payment")
@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    //키값

    @Column(nullable = false)
    private String userNickName;
    //user의 닉네임

    @Column(length = 255,nullable = false)
    private String info;
    //상세내역(충전, 환불, 가게명 등등)

    @Column(nullable = false)
    private int price;
    //금액

    @Column(nullable = false)
    private int totalPoint;
    //남은 잔액

    @Column(name = "time", columnDefinition = "datetime")
    private LocalDateTime insertTime;
    //insert할때 시간

    @Column(nullable = false)
    private long chatroomId;
    //체팅방id( 충전,환불은 -1)

    @Column(nullable = false)
    private boolean agreement;
    //구매확정(true=>확정, false=> 확정전)(충전,환불은 true)

}
