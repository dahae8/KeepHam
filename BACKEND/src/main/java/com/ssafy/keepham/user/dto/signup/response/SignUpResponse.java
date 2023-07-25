package com.ssafy.keepham.user.dto.signup.response;

import com.ssafy.keepham.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;

public record SignUpResponse(
        @Schema(description = "회원 고유키")
        Long id,
        @Schema(description = "회원 아이디")
        String userId,
        @Schema(description = "회원 이름")
        String name,
        @Schema(description = "회원 이메일")
        String email,
        @Schema(description = "회원 나이")
        Integer age

) {
    public static SignUpResponse toEntity(User user){
        return new SignUpResponse(
                user.getId(),
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.getAge()
                );
    }
}
