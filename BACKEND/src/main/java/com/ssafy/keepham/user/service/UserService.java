package com.ssafy.keepham.user.service;

import com.ssafy.keepham.user.dto.user.response.UserInfoResponse;
import com.ssafy.keepham.user.dto.user.response.UserUpdateResponse;
import com.ssafy.keepham.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public UserInfoResponse getUserRepository(String userId) {
        return userRepository.findByUserId(userId)
                .map(UserInfoResponse::toEntity)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));

    }
    @Transactional
    public UserUpdateResponse userUpdate(String userId){
        userRepository.findByUserId(userId);
        return null;
    }
}
