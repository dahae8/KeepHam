package com.ssafy.keepham.user.dto.signin.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignInRequest {
    @Schema(description = "회원 아이디")
    String userId;
    @Schema(description = "회원 비밀번호")
    String password;
}
