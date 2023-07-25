package com.ssafy.keepham.user.controller;

import com.ssafy.keepham.user.dto.ApiResponse;
import com.ssafy.keepham.user.dto.signin.request.SignInRequest;
import com.ssafy.keepham.user.dto.signup.request.SignUpRequest;
import com.ssafy.keepham.user.service.SignService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping
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
    @PostMapping("/login")
    public ApiResponse signIn(@RequestBody SignInRequest request){
        return ApiResponse.success(signService.signIn(request));
    }
}