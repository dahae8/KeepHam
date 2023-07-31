package com.ssafy.keepham.domain.user.dto.signup.response;

import com.ssafy.keepham.domain.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SignUpResponse {
    @Schema(description = "회원 고유키")
    private Long id;
    @Schema(description = "회원 아이디")
    private String userId;
    @Schema(description = "회원 이름")
    private String name;
    @Schema(description = "회원 이메일")
    private String email;
    @Schema(description = "회원 나이")
    private Integer age;

    public static SignUpResponse toEntity(User user) {
        return new SignUpResponse(
                user.getId(),
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.getAge()
        );
    }
}
