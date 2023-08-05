package com.ssafy.keepham.domain.box.dto;

import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoxRequest {

    @JsonSetter("status")
    private String status;
    //상태 => 정상, 고장, 수리중

    @JsonSetter("type")
    private String type;
    //유형 => 공용, 개인

    @JsonSetter("                                                 ")
    private boolean isValid;
    //삭제된것인가 => true(삭제된 상태), false(삭제 되지 않은 상태)

    @JsonSetter("address")
    private String address;
    //도로명*지번 주소

    @JsonSetter("detailedAddress")
    private String detailedAddress;
    // 상세 주소

    @JsonSetter("zipCode")
    private String zipCode;
    //우편번호

    @JsonSetter("chatRoomId")
    private long chatRoomId;
    //점유된 체팅방 id

    @JsonSetter("latitude")
    private double latitude;
    //위도

    @JsonSetter("hardness")
    private double hardness;
    //경도

}
