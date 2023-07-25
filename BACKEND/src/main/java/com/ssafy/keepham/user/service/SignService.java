package com.ssafy.keepham.user.service;

import com.ssafy.keepham.user.dto.signup.request.SignUpRequest;
import com.ssafy.keepham.user.dto.signup.response.SignUpResponse;

import com.ssafy.keepham.user.entity.User;
import com.ssafy.keepham.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class SignService {
    private final UserRepository userRepository;

    @Transactional
    public SignUpResponse registUser(SignUpRequest request){
        User user = userRepository.save(User.toEntity(request));
//        try {
//            userRepository.flush();
//        }catch (DataIntegrityViolationException e){
//            throw new IllegalArgumentException("이미 사용중인 아이디입니다.");
//        }
        return SignUpResponse.toEntity(user);
    }
}
