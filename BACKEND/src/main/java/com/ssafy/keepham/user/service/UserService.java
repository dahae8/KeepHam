package com.ssafy.keepham.user.service;

import com.ssafy.keepham.user.dto.user.request.UserUpdateRequest;
import com.ssafy.keepham.user.dto.user.response.UserDeleteResponse;
import com.ssafy.keepham.user.dto.user.response.UserInfoResponse;
import com.ssafy.keepham.user.dto.user.response.UserUpdateResponse;
import com.ssafy.keepham.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    //회원 정보 조회
    @Transactional
    public UserInfoResponse getUserRepository(String userId) {
        return userRepository.findByUserId(userId)
                .map(UserInfoResponse::toEntity)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));

    }
    //회원 정보 수정
    @Transactional
    public Optional<UserUpdateResponse> userUpdate(String userId, UserUpdateRequest request){
        return Optional.ofNullable(userRepository.findByUserId(userId)
            .filter(user -> user.getPassword().equals(request.getPassword()))
            .map(user -> {
                user.update(request);
                return UserUpdateResponse.of(true, user);
            })
            .orElseThrow(() -> new NoSuchElementException("아이디 또는 비밀번호가 일치하지 않습니다.")));
    }

    //회원 탈퇴
    @Transactional
    public UserDeleteResponse userDelete(Long id){
        if(!userRepository.existsById(id)) return new UserDeleteResponse(false);
        userRepository.deleteById(id);
        return new UserDeleteResponse(true);
    }
}
