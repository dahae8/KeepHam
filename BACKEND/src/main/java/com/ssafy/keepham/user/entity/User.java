package com.ssafy.keepham.user.entity;

import com.ssafy.keepham.user.common.GenderType;
import com.ssafy.keepham.user.common.UserRole;
import com.ssafy.keepham.user.dto.signup.request.SignUpRequest;
import com.ssafy.keepham.user.dto.user.request.UserUpdateRequest;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    private String userId;
    private String password;
    private String name;
    private String nickName;
    private String email;
    private String address;
    private String birthday;
    private Integer age;
    private UserRole userRole;
    private GenderType genderType;

    public static User toEntity(SignUpRequest request){
        return User.builder()
                .userId(request.getUserId())
                .password(request.getPassword())
                .name(request.getName())
                .nickName(request.getNickName())
                .email(request.getEmail())
                .age(request.getAge())
                .userRole(UserRole.USER)
                .build();
    }
    public void update(UserUpdateRequest newUser){
        this.password = newUser.getNewPassword() == null || newUser.getNewPassword().isBlank() ? this.password : newUser.getPassword();
        this.email = newUser.getEmail();
        this.nickName = newUser.getNickName();
    }
}
