package com.ssafy.keepham.user.dto.signup.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record SignUpRequest(
        @Schema(description = "유저 아이디")
        String userId,
        @Schema(description = "비밀번호")
        String password,
        @Schema(description = "이름")
        String name,
        @Schema(description = "별명")
        String nickName,
        @Schema(description = "휴대폰 번호")
        String phoneNumber,
        @Schema(description = "이메일")
        String email,
        @Schema(description = "나이")
        Integer age
) {
}
