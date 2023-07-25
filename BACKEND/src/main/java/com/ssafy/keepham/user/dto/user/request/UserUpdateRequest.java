package com.ssafy.keepham.user.dto.user.request;

import io.swagger.v3.oas.annotations.media.Schema;

public class UserUpdateRequest {
    @Schema(description = "회원 비밀번호")
    String password;
    @Schema(description = "회원 새비밀번호")
    String newPassword;
}
