package com.ssafy.keepham.domain.user.service;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.user.common.AccountStatus;
import com.ssafy.keepham.domain.user.common.UserRole;
import com.ssafy.keepham.domain.user.dto.user.request.UserDeleteRequest;
import com.ssafy.keepham.domain.user.dto.user.request.UserUpdateRequest;
import com.ssafy.keepham.domain.user.dto.user.response.UserDeleteResponse;
import com.ssafy.keepham.domain.user.dto.user.response.UserInfoResponse;
import com.ssafy.keepham.domain.user.dto.user.response.UserUpdateResponse;
import com.ssafy.keepham.domain.user.entity.User;
import com.ssafy.keepham.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.protocol.types.Field;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final String USER_HASH_KEY = "user";
    private final long USER_TTL_SECONDS = 3600;
    private final RedisTemplate<String, String> redisTemplate;

    //회원 정보 조회
    @Transactional
    public UserInfoResponse getUserInfo(String userId) {
        return userRepository.findByUserIdAndAccountStatus(userId, AccountStatus.ACTIVE)
                .map(UserInfoResponse::toDto)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));
    }
    //회원 정보 수정
    @Transactional
    public Optional<UserUpdateResponse> userUpdate(String userId, UserUpdateRequest request){
        return Optional.ofNullable(userRepository.findByUserIdAndAccountStatus(userId, AccountStatus.ACTIVE)
                .filter(user -> encoder.matches(request.getPassword(), user.getPassword()))
                .map(user -> {
                    user.update(request, encoder);
                    return UserUpdateResponse.of(true, user);
                })
                .orElseThrow(() -> new NoSuchElementException("아이디 또는 비밀번호가 틀립니다")));
    }

    //회원 탈퇴
    @Transactional
    public UserInfoResponse userDelete(UserDeleteRequest request){
        Optional<User> optionalUser = userRepository.findByUserIdAndAccountStatus(request.getUserId(),AccountStatus.ACTIVE);
        log.info("{}",optionalUser.get());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.delete(request);
            return UserInfoResponse.toDto(user);
        } else {
            throw new ApiException(ErrorCode.BAD_REQUEST,"유저 없음");
        }
    }

    public UserInfoResponse getLoginUserInfo(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User)auth.getPrincipal();
        HashOperations<String, String, String> userHash = redisTemplate.opsForHash();
        String userId = user.getUsername();
        String key = USER_HASH_KEY + ":" + userId;
        if (userHash.hasKey(key, "id")){
            String id = userHash.get(key,"id");
            String username = userHash.get(key, "username");
            String userNickName = userHash.get(key, "userNickName");
            String email = userHash.get(key, "email");
            String role = userHash.get(key, "role");
            UserInfoResponse userInfoResponse = new UserInfoResponse();
            userInfoResponse.setUserId(id);
            userInfoResponse.setEmail(email);
            userInfoResponse.setName(userNickName);
            userInfoResponse.setNickName(userNickName);
            if (role.equals(UserRole.USER.name())){
                userInfoResponse.setUserRole(UserRole.USER);
            } else {
                userInfoResponse.setUserRole(UserRole.ADMIN);
            }
            return userInfoResponse;

        }
        User userInfo = userRepository.findByUserIdAndAccountStatus(userId, AccountStatus.ACTIVE)
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST, "존재하지 않는 유저입니다."));
        userHash.put(key, "id", userInfo.getUserId());
        userHash.put(key, "username", userInfo.getName());
        userHash.put(key, "userNickName", userInfo.getNickName());
        userHash.put(key,"email", userInfo.getEmail());
        userHash.put(key,"role", userInfo.getUserRole().name());
        redisTemplate.expire(key, USER_TTL_SECONDS, TimeUnit.SECONDS);

        return UserInfoResponse.toDto(userInfo);
    }
}
