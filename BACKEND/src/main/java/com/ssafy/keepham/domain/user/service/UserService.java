package com.ssafy.keepham.domain.user.service;

import com.ssafy.keepham.domain.user.dto.user.request.UserUpdateRequest;
import com.ssafy.keepham.domain.user.dto.user.response.UserDeleteResponse;
import com.ssafy.keepham.domain.user.dto.user.response.UserInfoResponse;
import com.ssafy.keepham.domain.user.dto.user.response.UserUpdateResponse;
import com.ssafy.keepham.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    //회원 정보 조회
    @Transactional
    public UserInfoResponse getUserInfo(String userId) {
        return userRepository.findByUserId(userId)
                .map(UserInfoResponse::toDto)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));
    }
    //회원 정보 수정
    @Transactional
    public Optional<UserUpdateResponse> userUpdate(String userId, UserUpdateRequest request){
        return Optional.ofNullable(userRepository.findByUserId(userId)
                .filter(user -> encoder.matches(request.getPassword(), user.getPassword()))
                .map(user -> {
                    user.update(request, encoder);
                    return UserUpdateResponse.of(true, user);
                })
                .orElseThrow(() -> new NoSuchElementException("아이디 또는 비밀번호가 틀립니다")));
    }

    //회원 탈퇴
    @Transactional
    public UserDeleteResponse userDelete(String userId){
        if(!(userRepository.findByUserId(userId).isPresent())) return new UserDeleteResponse(false);
        userRepository.deleteById(userRepository.findByUserId(userId).get().getId());
        return new UserDeleteResponse(true);
    }
}
