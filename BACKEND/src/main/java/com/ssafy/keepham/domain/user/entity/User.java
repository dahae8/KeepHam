package com.ssafy.keepham.domain.user.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.keepham.domain.chatroomuser.entity.ChatRoomUserEntity;
import com.ssafy.keepham.domain.user.common.GenderType;
import com.ssafy.keepham.domain.user.common.UserRole;
import com.ssafy.keepham.domain.user.dto.signup.request.SignUpRequest;
import com.ssafy.keepham.domain.user.dto.user.request.UserUpdateRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

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
    @OneToMany(mappedBy = "user")
    private List<ChatRoomUserEntity> chatRooms = new ArrayList<>();

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
