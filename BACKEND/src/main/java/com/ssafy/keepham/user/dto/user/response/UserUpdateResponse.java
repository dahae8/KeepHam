package com.ssafy.keepham.user.dto.user.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserUpdateResponse{

    boolean result;
    String userId;
    String name;

    public UserUpdateResponse(boolean result, String userId, String name) {
        this.result = result;
        this.userId = userId;
        this.name = name;
    }
}

