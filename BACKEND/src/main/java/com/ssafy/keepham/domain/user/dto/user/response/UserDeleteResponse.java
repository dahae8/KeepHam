package com.ssafy.keepham.domain.user.dto.user.response;

import com.ssafy.keepham.domain.user.common.AccountStatus;
import com.ssafy.keepham.domain.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDeleteResponse {
    @Schema(description = "회원 탈퇴")
    AccountStatus accountStatus;
    public static UserDeleteResponse of(AccountStatus accountStatus) {
        return new UserDeleteResponse(accountStatus);
    }
}
