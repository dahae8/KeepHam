package com.ssafy.keepham.domain.user.dto.user.request;

import com.ssafy.keepham.domain.user.common.AccountStatus;
import lombok.Getter;

@Getter
public class UserDeleteRequest {
    String userId;
    AccountStatus accountStatus;
}
