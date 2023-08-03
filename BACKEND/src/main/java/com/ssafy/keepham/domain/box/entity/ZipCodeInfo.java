package com.ssafy.keepham.domain.box.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "zip_code_info")
@Entity
public class ZipCodeInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long zipCodeInfoId;

    @Column(length = 50, nullable = false)
    private String zipCode;
    //우편번호

    @Column(nullable = false)
    private long jibun_info_id;
    //우편번호
}
