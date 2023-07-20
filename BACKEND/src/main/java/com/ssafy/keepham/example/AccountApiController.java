package com.ssafy.keepham.example;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.error.UserErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.example.model.AccountMeResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/v0/api")
public class AccountApiController {

    @GetMapping("/test1")
    public Api<AccountMeResponse> me(){
        var response = AccountMeResponse.builder()
                .name("이름이에요")
                .email("메일@gmail.com")
                .registeredAt(LocalDateTime.now())
                .build();

        var str = "안녕";
        try {
            Integer.parseInt(str); //에러가 터질거다.
        } catch (Exception e){
            throw new ApiException(ErrorCode.SERVER_ERROR, "파싱에서 에러 발생");
        }
        return Api.OK(response);
    }

    @GetMapping("/test2")
    public Api<Object> me2(){
        var res = AccountMeResponse.builder()
                .name("하잉")
                .email("메일@gmail.com")
                .registeredAt(LocalDateTime.now())
                .build();

        return Api.ERROR(UserErrorCode.USER_NOT_FOUND, String.format("%s 라는 유저는 없습니다.", res.getName()));
    }

    @GetMapping("/test3")
    public Api<Object> me3(){
        var res = AccountMeResponse.builder()
                .name("하잉")
                .email("메일@gmail.com")
                .registeredAt(LocalDateTime.now())
                .build();

        return Api.OK(res);
    }

}
