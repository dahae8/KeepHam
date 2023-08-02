package com.ssafy.keepham.domain.box.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoxRequest {
    private String address;
    //주소
    private String status;
    //상태 => 정상, 고장, 수리중
    private String type;
    //유형 => 공용, 개인
    private boolean isValid;
    //삭제된것인가 => true(삭제된 상태), false(삭제 되지 않은 상태)
}
