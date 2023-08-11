package com.ssafy.keepham.domain.user.service;

import com.ssafy.keepham.common.error.UserErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.user.common.AccountStatus;
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
    public SignUpResponse registerUser(SignUpRequest request){
        User user = userRepository.save(User.toEntity(request,encoder));
        userRepository.flush();
        return SignUpResponse.toEntity(user);
    }

    @Transactional
    public SignInResponse signIn(SignInRequest request){
        User user = userRepository.findByUserIdAndAccountStatus(request.getUserId(),AccountStatus.ACTIVE)
                .filter(u -> encoder.matches(request.getPassword(), u.getPassword()))
                .orElseThrow(() -> new ApiException(UserErrorCode.INVALID_USER));
        String accessToken = tokenProvider.createAccessToken(String.format("%s:%s",user.getUserId(),user.getUserRole()));
        String refreshToken = tokenProvider.createRefreshToken();
        userRefreshTokenRepository.findById(user.getId())
                .ifPresentOrElse(it -> it.updateRefreshToken(refreshToken),
                () -> userRefreshTokenRepository.save(new UserRefreshToken(user, refreshToken))
                    );
        log.info("로그인성공");
        return new SignInResponse(user.getName(),user.getNickName(), user.getUserRole(), accessToken, refreshToken);
    }

    public boolean checkId(String userId, AccountStatus accountStatus){
        return userRepository.findByUserIdAndAccountStatus(userId, accountStatus).isPresent();
    }

    public boolean checkNickname(String nickName, AccountStatus accountStatus){
        return userRepository.findByNickNameAndAccountStatus(nickName, accountStatus).isPresent();
    }
}
