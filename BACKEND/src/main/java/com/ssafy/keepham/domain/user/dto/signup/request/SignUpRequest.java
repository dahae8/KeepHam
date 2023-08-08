package com.ssafy.keepham.domain.user.dto.signup.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequest {
        @Schema(description = "유저 아이디")
        private String userId;
        @Schema(description = "비밀번호")
        private String password;
        @Schema(description = "이름")
        private String name;
        @Schema(description = "별명")
        private String nickName;
        @Schema(description = "이메일")
        private String email;
        @Schema(description = "휴대폰 번호")
        private String tel;
}
