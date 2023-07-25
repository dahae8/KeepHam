package com.ssafy.keepham.user.entity;

import com.ssafy.keepham.user.common.GenderType;
import com.ssafy.keepham.user.common.UserRole;
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
    private String phoneNumber;
    private String email;
    private String address;
    private String birthday;
    private Integer age;
    private UserRole userRole;
    private GenderType genderType;


}
