package com.ssafy.keepham;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.keepham.user.dto.user.request.UserUpdateRequest;
import com.ssafy.keepham.user.dto.user.response.UserDeleteResponse;
import com.ssafy.keepham.user.dto.user.response.UserUpdateResponse;
import com.ssafy.keepham.user.entity.User;
import com.ssafy.keepham.user.repository.UserRepository;
import com.ssafy.keepham.user.service.UserService;
import java.util.Optional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserUpdateTest {
    private UserService userService;
    private UserRepository userRepository;

    @BeforeEach
    @AfterEach
    void clear(){
        userRepository.deleteAll(); // 여러 케이스 돌릴 경우 내용물 삭제
    }

    @Test
    void 회원정보수정(){
        User savedUser = userRepository.save(User.builder()
            .userId("ssafy")
            .password("ssafy")
            .build());
        UserUpdateRequest request = new UserUpdateRequest("1234","5678","ssafy","ssafy");
        Optional<UserUpdateResponse> result = userService.userUpdate(savedUser.getUserId(),request);
        assertThat(result.get()).isEqualTo(true);
        assertThat(result.get().getEmail()).isEqualTo("ssafy");
        assertThat(result.get().getNickName()).isEqualTo("ssafy");

    }

    @Test
    void 회원탈퇴(){
        User savedUser = userRepository.save(User.builder()
            .userId("ssafy")
            .password("ssafy")
            .build());

        UserDeleteResponse result = userService.userDelete(savedUser.getUserId());
        assertThat(result.isResult()).isEqualTo(true);
    }
}
