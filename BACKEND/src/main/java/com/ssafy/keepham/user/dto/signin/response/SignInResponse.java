package com.ssafy.keepham.user.dto.signin.response;

import com.ssafy.keepham.user.common.UserRole;
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
    public SignInResponse(String name, UserRole userRole) {
        this.name = name;
        this.userRole = userRole;
    }
}
