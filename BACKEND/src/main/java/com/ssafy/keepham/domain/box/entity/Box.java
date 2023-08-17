package com.ssafy.keepham.domain.box.entity;

import jakarta.persistence.*;
import lombok.*;
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "box")
@Entity
public class Box {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    //키값

    @Column(length = 255, nullable = false)
    private String status;
    //상태 => 정상, 고장, 수리중

    @Column(length = 255, nullable = false)
    private String type;
    //유형 => 공용, 개인

    @Column(nullable = false)
    private boolean isValid;
    //삭제된것인가 => true(삭제 되지 않은상태), false(삭제된 상태)

    //주소
    @Column(length = 255, nullable = false)
    private String address;
    // 도로명*지번 주소

    @Column(length = 255, nullable = false)
    private String detailedAddress;
    // 상세 주소

    @Column(length = 5)
    private String zipCode;
    //우편번호

    @Column (nullable = false)
    private boolean isUsed;
    //사용중인가 => true(사용), false(사용하지 않음)

    @Column(nullable = false)
    private double latitude;
    //위도

    @Column(nullable = false)
    private double hardness;
    //경도
}
