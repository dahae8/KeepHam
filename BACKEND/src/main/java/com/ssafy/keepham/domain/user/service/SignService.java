package com.ssafy.keepham.domain.user.service;

import com.ssafy.keepham.domain.user.entity.User;
import com.ssafy.keepham.domain.user.entity.UserRefreshToken;
import com.ssafy.keepham.domain.user.repository.UserRefreshTokenRepository;
import com.ssafy.keepham.domain.user.repository.UserRepository;
import com.ssafy.keepham.security.TokenProvider;
import com.ssafy.keepham.domain.user.dto.signin.request.SignInRequest;
import com.ssafy.keepham.domain.user.dto.signin.response.SignInResponse;
import com.ssafy.keepham.domain.user.dto.signup.request.SignUpRequest;
import com.ssafy.keepham.domain.user.dto.signup.response.SignUpResponse;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class SignService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final TokenProvider tokenProvider;
    private final UserRefreshTokenRepository userRefreshTokenRepository;

    @Transactional
    public SignUpResponse registUser(SignUpRequest request){
        User user = userRepository.save(User.toEntity(request,encoder));
        try {
            userRepository.flush();
        }catch (DataIntegrityViolationException e){
            throw new IllegalArgumentException("이미 사용중인 아이디입니다.");
        }
        return SignUpResponse.toEntity(user);
    }

    @Transactional
    public SignInResponse signIn(SignInRequest request){
        User user = userRepository.findByUserId(request.getUserId())
                .filter(u -> encoder.matches(request.getPassword(), u.getPassword()))
                .orElseThrow(() ->new IllegalArgumentException("아이디 또는 비밀번호가 틀렸습니다."));
        String accessToken = tokenProvider.createAccessToken(String.format("%s:%s",user.getUserId(),user.getUserRole()));
        String refreshToken = tokenProvider.createRefreshToken();
        userRefreshTokenRepository.findById(user.getId())
                .ifPresentOrElse(it -> it.updateRefreshToken(refreshToken),
                () -> userRefreshTokenRepository.save(new UserRefreshToken(user, refreshToken))
                    );
        return new SignInResponse(user.getName(), user.getUserRole(), accessToken, refreshToken);
    }
}
