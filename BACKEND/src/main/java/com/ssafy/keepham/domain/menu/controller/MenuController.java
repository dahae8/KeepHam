package com.ssafy.keepham.domain.menu.controller;

import com.ssafy.keepham.domain.menu.service.MenuService;
import com.ssafy.keepham.domain.user.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class MenuController {
    private final MenuService menuService;

    @Operation(summary = "가게의 메뉴 정보 조회")
    @GetMapping("store/{storeId}")
    public ApiResponse getAllMenus(@PathVariable int storeId){
        return ApiResponse.success(menuService.getMenus(storeId));
    }
}
