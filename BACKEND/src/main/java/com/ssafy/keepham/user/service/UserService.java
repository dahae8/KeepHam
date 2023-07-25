package com.ssafy.keepham.user.service;

import com.ssafy.keepham.user.dto.user.response.UserInfoResponse;
import com.ssafy.keepham.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.beans.Transient;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    @Transient
    public UserInfoResponse getUserRepository(String userId) {
        return userRepository.findByUserId(userId)
                .map(UserInfoResponse::toEntity)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));

    }
}
