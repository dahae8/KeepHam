package com.ssafy.keepham.domain.user.controller;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.security.JwtAuthenticationFilter;
import com.ssafy.keepham.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
@Slf4j
@CrossOrigin("*")
public class TokenController {

    private final TokenProvider tokenProvider;


    @GetMapping("/verifyToken")
    public String verifyToken(@RequestHeader("Authorization") String auth){
        var result = tokenProvider.validateTokenAndGetSubject(auth);
        log.info("유효성 검사 : {}", result);
        return result;
    }

}
