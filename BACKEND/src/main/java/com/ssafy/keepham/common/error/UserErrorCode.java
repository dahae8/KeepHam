package com.ssafy.keepham.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

// User의 경우 1000번대 에러코드를 사용하기로 결정

@AllArgsConstructor
@Getter
public enum UserErrorCode implements ErrorCodeIfs{

    USER_NOT_FOUND(HttpStatus.NOT_FOUND.value(), 1404, "존재하지 않는 유저입니다."),
    INVALID_USER(HttpStatus.NOT_FOUND.value(), 1405, "아이디나 비밀번호가 틀립니다."),
    ;

    private final Integer httpStatusCode;
    private final Integer errorCode;
    private final String description;
}
