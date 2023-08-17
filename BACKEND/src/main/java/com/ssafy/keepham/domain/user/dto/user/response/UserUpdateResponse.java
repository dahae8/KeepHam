package com.ssafy.keepham.domain.user.dto.user.response;

import com.ssafy.keepham.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateResponse{

    boolean result;
    String email;
    String tel;

    public static UserUpdateResponse of(boolean result, User user) {
        return new UserUpdateResponse(result, user.getEmail(),user.getTel());
    }
}

