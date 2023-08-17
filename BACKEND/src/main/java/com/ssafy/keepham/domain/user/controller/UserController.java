package com.ssafy.keepham.domain.user.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.domain.user.common.AccountStatus;
import com.ssafy.keepham.domain.user.dto.user.request.UserDeleteRequest;
import com.ssafy.keepham.domain.user.dto.user.response.UserInfoResponse;
import com.ssafy.keepham.domain.user.dto.user.response.UserUpdateResponse;
import com.ssafy.keepham.domain.user.service.UserService;
import com.ssafy.keepham.domain.user.dto.ApiResponse;
import com.ssafy.keepham.domain.user.dto.user.request.UserUpdateRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Tag(name = "로그인 후 사용 가능")
@RestController
//@UserAuthority
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    @Operation(summary = "회원 정보 조회")
    @ApiResponses
    @GetMapping("/user/{userId}")
    public Api<UserInfoResponse> getUserInfo(@PathVariable String userId){
        return Api.OK(userService.getUserInfo(userId));
    }
    @Operation(summary = "회원 정보 수정")
    @PutMapping("/user/{userId}")
    public Api<Optional<UserUpdateResponse>> updateUser(@PathVariable String userId, @RequestBody UserUpdateRequest request){
        return Api.OK(userService.userUpdate(userId, request));
    }
    @Operation(summary = "회원 삭제")
    @PutMapping("/user/delete")
    public Api<UserInfoResponse> deleteUser(@RequestBody UserDeleteRequest request){
        return Api.OK(userService.userDelete(request));
    }
}
