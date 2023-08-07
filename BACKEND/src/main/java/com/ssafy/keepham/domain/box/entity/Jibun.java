package com.ssafy.keepham.domain.box.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "jibun")
@Entity
public class Jibun {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    //키값

    @Column(length = 50, nullable = false)
    private String sdNm;
    //시도명

    @Column(length = 50, nullable = false)
    private String sggNm;
    //시군구명

    @Column(length = 50, nullable = false)
    private String umdNm;
    //법정읍면동명

    @Column(length = 5, nullable = false)
    private String zipCode;
    //우편번호

}
