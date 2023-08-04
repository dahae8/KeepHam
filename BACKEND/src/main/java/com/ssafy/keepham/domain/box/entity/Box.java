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
    private String address;
    //주소

    @Column(length = 255, nullable = false)
    private String status;
    //상태 => 정상, 고장, 수리중

    @Column(length = 255, nullable = false)
    private String type;
    //유형 => 공용, 개인

    @Column(nullable = false)
    private boolean isValid;
    //삭제된것인가 => true(삭제 되지 않은상태), false(삭제된 상태)

}
