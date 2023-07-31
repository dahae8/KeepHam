package com.ssafy.keepham.domain.user.dto.user.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDeleteResponse {
    @Schema(description = "회원 탈퇴")
    boolean result;
}
