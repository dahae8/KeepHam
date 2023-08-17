package com.ssafy.keepham.domain.admin.controller;

import com.ssafy.keepham.domain.admin.service.AdminService;
import com.ssafy.keepham.domain.user.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "관리자 전용 페이지")
//@AdminAuthority
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;
    @Operation(summary = "모든 유저 조회")
    @GetMapping("/users")
    public ApiResponse getAllUsers(){
        return ApiResponse.success(adminService.getUsers());
    }
    @Operation(summary = "모든 괸라자 조회")
    @GetMapping("/admins")
    public ApiResponse getAllAdmins(){
        return ApiResponse.success(adminService.getAdmins());
    }
}
