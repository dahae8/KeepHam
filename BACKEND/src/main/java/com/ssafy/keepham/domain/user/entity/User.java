package com.ssafy.keepham.domain.user.entity;

import com.ssafy.keepham.domain.user.common.AccountStatus;
import com.ssafy.keepham.domain.user.common.GenderType;
import com.ssafy.keepham.domain.user.common.UserRole;
import com.ssafy.keepham.domain.user.dto.signup.request.SignUpRequest;
import com.ssafy.keepham.domain.user.dto.user.request.UserDeleteRequest;
import com.ssafy.keepham.domain.user.dto.user.request.UserUpdateRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

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

    @Column(nullable = false, unique = true)
    private String userId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String nickName;

    @Column(nullable = false)
    private String tel;

    private String email;

    private String address;

    private String birthday;

    private Integer age;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    @Enumerated(EnumType.STRING)
    private GenderType genderType;
    @Enumerated(EnumType.STRING)
    private AccountStatus accountStatus;
    @CreationTimestamp
    private LocalDateTime createAt;


    public static User toEntity(SignUpRequest request, PasswordEncoder encoder){
        return User.builder()
                .userId(request.getUserId())
                .password(encoder.encode(request.getPassword()))
                .name(request.getName())
                .nickName(request.getNickName())
                .email(request.getEmail())
                .tel(request.getTel())
                .userRole(UserRole.USER)
                .accountStatus(AccountStatus.ACTIVE)
                .build();
    }
    public void update(UserUpdateRequest newUser, PasswordEncoder encoder){
        this.password = newUser.getNewPassword() == null || newUser.getNewPassword().isBlank() ? this.password : encoder.encode(newUser.getNewPassword());
        this.email = newUser.getEmail();
        this.tel = newUser.getTel();
    }
    public void delete(UserDeleteRequest newStatus){
        this.accountStatus = AccountStatus.INACTIVE;
    }
}
