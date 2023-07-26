package com.ssafy.keepham.user.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class UserRefreshToken {
    @Id
    private UUID userId;

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

    public void increaseReissueCount(){
        reissueCount++;
    }
}
