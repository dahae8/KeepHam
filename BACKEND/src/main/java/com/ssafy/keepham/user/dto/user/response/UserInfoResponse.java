package com.ssafy.keepham.user.dto.user.response;

import com.ssafy.keepham.user.common.GenderType;
import com.ssafy.keepham.user.common.UserRole;
import com.ssafy.keepham.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;

public record UserInfoResponse(
        @Schema(description = "회원 고유키")
        Long id,
        @Schema(description = "회원 아이디")
        String userId,
        @Schema(description = "회원 비밀번호")
        String password,
        @Schema(description = "회원 이름")
        String name,
        @Schema(description = "회원 별명")
        String nickName,
        @Schema(description = "회원 이메일")
        String email,
        @Schema(description = "회원 나이")
        Integer age,
        @Schema(description = "회원 유형")
        UserRole userRole,
        @Schema(description = "성별")
        GenderType genderType


) {
    public static UserInfoResponse toEntity(User user){
        return new UserInfoResponse(
                user.getId(),
                user.getPassword(),
                user.getName(),
                user.getNickName(),
                user.getEmail(),
                user.getAddress(),
                user.getAge(),
                user.getUserRole(),
                user.getGenderType()
        );
    }
}
