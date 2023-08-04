package com.ssafy.keepham.domain.box.dto;

import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoxSaveRequest {

    @JsonSetter("type")
    private String type;
    //유형 => 공용, 개인

    @JsonSetter("address")
    private String address;
    //도로명*지번 주소

    @JsonSetter("detailedAddress")
    private String detailedAddress;
    // 상세 주소

    @JsonSetter("zipCode")
    private String zipCode;
    //우편번호

    @JsonSetter("latitude")
    private double latitude;
    //위도

    @JsonSetter("hardness")
    private double hardness;
    //경도

}
