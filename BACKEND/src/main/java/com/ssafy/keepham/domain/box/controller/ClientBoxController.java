package com.ssafy.keepham.domain.box.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.domain.box.dto.BoxResponse;
import com.ssafy.keepham.domain.box.service.BoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping()
public class ClientBoxController {
    private final BoxService boxService;

    @Autowired
    public ClientBoxController(BoxService boxService){

        this.boxService = boxService;
    }

    //우편번호 근처에 해당하는 삭제안된 박스 리스트 검색
    @GetMapping("/openapi/{zipCode}")
    public Api<List<BoxResponse>> getAddressAllBox(@PathVariable String zipCode){
        return Api.OK(boxService.getAddressAllBox(zipCode));

    }
}
