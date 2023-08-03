package com.ssafy.keepham.domain.address.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.domain.address.service.JibunInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/openapi/address")
public class JibunInfoController {

    private final JibunInfoService jibunInfoService;

    @Autowired
    public JibunInfoController(JibunInfoService jibunInfoService){
        this.jibunInfoService = jibunInfoService;
    }

    @GetMapping
    public Api<List<String>> getAllJibunInfo(){
        return Api.OK(jibunInfoService.getAllJIbunInfo());
    }
}
