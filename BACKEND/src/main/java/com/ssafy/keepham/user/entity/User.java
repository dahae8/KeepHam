package com.ssafy.keepham.user.entity;

import com.ssafy.keepham.user.common.GenderType;
import com.ssafy.keepham.user.common.UserRole;
import com.ssafy.keepham.user.dto.signup.request.SignUpRequest;
import com.ssafy.keepham.user.dto.user.request.UserUpdateRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "user")
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

    public static User toEntity(SignUpRequest request, PasswordEncoder encoder){
        return User.builder()
                .userId(request.getUserId())
                .password(encoder.encode(request.getPassword()))
                .name(request.getName())
                .nickName(request.getNickName())
                .email(request.getEmail())
                .age(request.getAge())
                .userRole(UserRole.USER)
                .build();
    }
    public void update(UserUpdateRequest newUser, PasswordEncoder encoder){
        this.password = newUser.getNewPassword();
//                == null || newUser.getNewPassword().isBlank() ? this.password : encoder.encode(newUser.getPassword());
        this.email = newUser.getEmail();
        this.nickName = newUser.getNickName();
    }
}
