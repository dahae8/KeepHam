package com.ssafy.keepham;



import com.ssafy.keepham.domain.user.entity.User;
import com.ssafy.keepham.domain.user.repository.UserRepository;
import com.ssafy.keepham.domain.user.service.UserService;
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
//    void clear(){
//        userRepository.deleteAll(); // 여러 케이스 돌릴 경우 내용물 삭제
//    }

    @Test
    void 회원정보수정() {
        // Given
        User savedUser = userRepository.save(User.builder()
                .userId("ssay")
                .password("ssafy")
                .build());
        System.out.println(savedUser.toString());
//        UserUpdateRequest request = new UserUpdateRequest("1234", "5678", "ssafy", "ssafy");
//
//        // When
//        Optional<UserUpdateResponse> result = userService.userUpdate(savedUser.getUserId(), request);
//
//        // Then
//        assertTrue(result.isPresent()); // Optional이 비어있지 않은지 확인
//
//        // Optional이 비어있지 않은 경우에만 값에 접근하여 검증
//        result.ifPresent(userUpdateResponse -> {
//            assertTrue(userUpdateResponse.isResult());
//            assertEquals("ssafy", userUpdateResponse.getEmail());
//            assertEquals("ssafy", userUpdateResponse.getNickName());
//        });
    }

//    @Test
//    void 회원탈퇴(){
//        User savedUser = userRepository.save(User.builder()
//            .userId("ssafy")
//            .password("ssafy")
//            .build());
//
//        UserDeleteResponse result = userService.userDelete(savedUser.getUserId());
//        assertThat(result.isResult()).isEqualTo(true);
//    }


}
