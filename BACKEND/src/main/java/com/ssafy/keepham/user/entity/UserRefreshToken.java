package com.ssafy.keepham.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class UserRefreshToken {
    @Id
    private Long id;

    @OneToOne
    private User user;
    private String refreshToken;
    private int reissueCount = 0;

    public UserRefreshToken(User user, String refreshToken){
        this.user = user;
        this.refreshToken = refreshToken;
    }

    public void updateRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }

    public boolean validateRefreshToken(String refreshToken){
        return this.refreshToken.equals(refreshToken);
    }

    public void increaseReissue(int reissueCount){
        reissueCount++;
    }
}
