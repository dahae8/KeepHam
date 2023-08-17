package com.ssafy.keepham.domain.user.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
@Slf4j
public class TokenController {

    private final TokenProvider tokenProvider;

    @GetMapping("/verifyToken")
    public Api<String> verifyToken(@RequestHeader("Authorization") String auth){
        var result = tokenProvider.validateTokenAndGetSubject(auth);
        return Api.OK(result);
    }

}
