package com.ssafy.keepham.domain.address.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "jibun_info")
@Entity
public class JibunInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long jibunInfoId;
    //키값

    @Column(length = 50, nullable = false)
    private String sdNm;
    //시도명

    @Column(length = 50, nullable = false)
    private String sggNm;
    //시군구명

    @Column(length = 50)
    private String umdNm;
    //법정읍면동명

    @Column(length = 50)
    private String riNm;
    //법정리명

}
