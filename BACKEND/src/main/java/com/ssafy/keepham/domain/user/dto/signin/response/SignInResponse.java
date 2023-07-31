package com.ssafy.keepham.domain.user.dto.signin.response;

import com.ssafy.keepham.domain.user.common.UserRole;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignInResponse {
    @Schema(description = "회원 이름")
    String name;
    @Schema(description = "회원 유형")
    UserRole userRole;
    String accessToken;
    String refreshToken;
    public SignInResponse(String name, UserRole userRole, String accessToken, String refreshToken) {
        this.name = name;
        this.userRole = userRole;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
