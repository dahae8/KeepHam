package com.ssafy.keepham.domain.user.controller;

import com.ssafy.keepham.domain.user.service.UserService;
import com.ssafy.keepham.domain.user.dto.ApiResponse;
import com.ssafy.keepham.domain.user.dto.user.request.UserUpdateRequest;
import com.ssafy.keepham.security.UserAuthority;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "로그인 후 사용 가능")
@RestController
//@UserAuthority
@RequiredArgsConstructor
@RequestMapping("/api")
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
