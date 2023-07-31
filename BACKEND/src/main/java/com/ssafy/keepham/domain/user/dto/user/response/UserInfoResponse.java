package com.ssafy.keepham.domain.user.dto.user.response;

import com.ssafy.keepham.domain.user.common.GenderType;
import com.ssafy.keepham.domain.user.common.UserRole;
import com.ssafy.keepham.domain.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponse {
    @Schema(description = "회원 고유키")
    private Long id;

    @Schema(description = "회원 아이디")
    private String userId;

    @Schema(description = "회원 이름")
    private String name;

    @Schema(description = "회원 별명")
    private String nickName;

    @Schema(description = "회원 이메일")
    private String email;

    @Schema(description = "회원 나이")
    private Integer age;

    @Schema(description = "회원 유형")
    private UserRole userRole;

    @Schema(description = "성별")
    private GenderType genderType;

    public static UserInfoResponse toDto(User user) {
        return new UserInfoResponse(
            user.getId(),
            user.getUserId(),
            user.getName(),
            user.getNickName(),
            user.getEmail(),
            user.getAge(),
            user.getUserRole(),
            user.getGenderType()
        );
    }
}
