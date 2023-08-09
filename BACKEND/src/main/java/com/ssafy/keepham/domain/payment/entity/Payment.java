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
    private long userId;
    //user의 키값

    @Column(nullable = false)
    private long price;
    //금액

    @Column(nullable = false)
    private boolean type;
    //포인트 충전(true), 포인트 사용(false)

    @Column(length = 255,nullable = false)
    private String info;
    //상세내역(충전, 환불, 가게명 등등)

    @Column(name = "time", columnDefinition = "datetime")
    private LocalDateTime updateTime;
    //포인트 변경 시간

}
