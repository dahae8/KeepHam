package com.ssafy.keepham.domain.box.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.common.error.BoxError;
import com.ssafy.keepham.domain.box.dto.BoxResponse;
import com.ssafy.keepham.domain.box.service.BoxService;
import com.ssafy.keepham.domain.box.service.JibunService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boxs")
public class ClientBoxController {
    private final BoxService boxService;
    private final JibunService jibunService;

    //우편번호 근처에 해당하는 삭제안된 함 리스트 검색
    @Operation(summary = "우편번호로 근처의 함들 조회")
    @GetMapping("/{zipCode}")
    public Api<Object> getAddressAllBox(@PathVariable String zipCode){
        if(jibunService.checkoutZipCode(zipCode)){
            return Api.ERROR(BoxError.BOX_BAD_REQUEST, String.format("올바른 zipCode[우편번호]룰 작성해주새요"));
        }
        return Api.OK(boxService.getAddressAllBox(zipCode));
    }

    //사용하지 않은 함 리스트 조회
    @Operation(summary = "사용하지 않은 함 리스트 조회")
    @GetMapping("/unused/{zipCode}")
    public Api<Object> getUnusedAllBox(@PathVariable String zipCode){
        if(jibunService.checkoutZipCode(zipCode)){
            return Api.ERROR(BoxError.BOX_BAD_REQUEST, String.format("올바른 zipCode[우편번호]룰 작성해주새요"));
        }
        return Api.OK(boxService.getUnusedAllBox(zipCode));
    }

}
