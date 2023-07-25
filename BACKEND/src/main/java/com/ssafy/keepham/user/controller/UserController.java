package com.ssafy.keepham.user.controller;

import com.ssafy.keepham.user.dto.ApiResponse;
import com.ssafy.keepham.user.dto.user.request.UserUpdateRequest;
import com.ssafy.keepham.user.entity.User;
import com.ssafy.keepham.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
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
    @Operation(summary = "회원 정보 수정")
    @PutMapping
    public ApiResponse updateUser(String userId, @RequestBody UserUpdateRequest request){
        return ApiResponse.success(userService);
    }
}
