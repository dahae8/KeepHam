package com.ssafy.keepham.user.controller;

import com.ssafy.keepham.user.dto.ApiResponse;
import com.ssafy.keepham.user.dto.user.request.UserUpdateRequest;
import com.ssafy.keepham.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Operation(summary = "회원 정보 조회")
    @ApiResponses
    @GetMapping
    public ApiResponse getUserInfo(String userId){
        return ApiResponse.success(userService.getUserInfo(userId));
    }
    @Operation(summary = "회원 정보 수정")
    @PutMapping
    public ApiResponse updateUser(String userId, @RequestBody UserUpdateRequest request){
        return ApiResponse.success(userService.userUpdate(userId, request));
    }
    @Operation(summary = "회원 삭제")
    @DeleteMapping
    public ApiResponse deleteUser(String userId){
        return ApiResponse.success(userService.userDelete(userId));
    }
}
