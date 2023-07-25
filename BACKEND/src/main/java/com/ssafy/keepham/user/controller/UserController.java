package com.ssafy.keepham.user.controller;

import com.ssafy.keepham.user.dto.ApiResponse;
import com.ssafy.keepham.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Operation(summary = "회원 정보 조회")
    @GetMapping
    public ApiResponse getUserInfo(String UserId){
        return ApiResponse.success(userService.getUserRepository(UserId));
    }
}
