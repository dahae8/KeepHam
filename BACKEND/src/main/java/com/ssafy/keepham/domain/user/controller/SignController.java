package com.ssafy.keepham.domain.user.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.domain.user.common.AccountStatus;
import com.ssafy.keepham.domain.user.dto.ApiResponse;
import com.ssafy.keepham.domain.user.dto.signin.request.SignInRequest;
import com.ssafy.keepham.domain.user.dto.signin.response.SignInResponse;
import com.ssafy.keepham.domain.user.dto.signup.request.SignUpRequest;
import com.ssafy.keepham.domain.user.dto.signup.response.SignUpResponse;
import com.ssafy.keepham.domain.user.service.SignService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
@Slf4j
public class SignController {
    private final SignService signService;

    @Operation(summary = "회원가입")
    @PostMapping("/sign-up")
    public Api<SignUpResponse> signUp(@RequestBody SignUpRequest request){
        return Api.OK(signService.registerUser(request));
    }
    @Operation(summary = "회원 로그인")
    @PostMapping("/sign-in")
    public Api<SignInResponse> signIn(@RequestBody SignInRequest request ){
        return Api.OK(signService.signIn(request));
    }

    @Operation(summary = "ID 중복확인 : 중복이면 false ")
    @GetMapping("/validation")
    public Api<Boolean> getUserId(@RequestParam String userId, AccountStatus accountStatus){
        return Api.OK(!signService.checkId(userId,accountStatus));
    }
}
