package com.ssafy.keepham.domain.user.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.domain.user.dto.ApiResponse;
import com.ssafy.keepham.domain.user.dto.signin.request.SignInRequest;
import com.ssafy.keepham.domain.user.dto.signin.response.SignInResponse;
import com.ssafy.keepham.domain.user.dto.signup.request.SignUpRequest;
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
    public ApiResponse signUp(@RequestBody SignUpRequest request){
        return ApiResponse.success(signService.registUser(request));
    }
    @Operation(summary = "회원 로그인")
    @PostMapping("/sign-in")
    @CrossOrigin("http://localhost:3000")
    public Api<SignInResponse> signIn(@RequestBody SignInRequest request){
        return Api.OK(signService.signIn(request));
    }
}
