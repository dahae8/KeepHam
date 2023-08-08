package com.ssafy.keepham.domain.store.controller;

import com.ssafy.keepham.domain.store.service.StoreService;
import com.ssafy.keepham.domain.user.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class StoreController {
    private final StoreService storeService;

    @Operation(summary = "가게 정보 조회")
    @GetMapping("/stores")
    public ApiResponse getAllStores(@RequestParam String address, @RequestParam float lat, @RequestParam float lng){
        return ApiResponse.success(storeService.getStores(address,lat, lng));
    }
}
