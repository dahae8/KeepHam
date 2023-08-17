package com.ssafy.keepham.domain.user.dto.user.response;

import com.ssafy.keepham.domain.user.common.GenderType;
import com.ssafy.keepham.domain.user.common.UserRole;
import com.ssafy.keepham.domain.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserInfoResponse {

    @Schema(description = "회원 아이디")
    private String userId;

    @Schema(description = "회원 이름")
    private String name;

    @Schema(description = "회원 별명")
    private String nickName;

    @Schema(description = "회원 이메일")
    private String email;

    @Schema(description = "회원 전화번호")
    private String tel;
    @Schema(description = "회원 권한")
    private UserRole userRole;


    public static UserInfoResponse toDto(User user) {
        return new UserInfoResponse(
            user.getUserId(),
            user.getName(),
            user.getNickName(),
            user.getEmail(),
            user.getTel(),
            user.getUserRole()
        );
    }
}
