package com.ssafy.keepham.domain.box.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoxSaveRequest {

    private String type;
    //유형 => 공용, 개인

    private String address;
    //도로명*지번 주소

    private String detailedAddress;
    // 상세 주소

    private String zipCode;
    //우편번호

}
