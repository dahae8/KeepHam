package com.ssafy.keepham.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode implements ErrorCodeIfs {

    OK(HttpStatus.OK.value(), 200, "성공"),
    BAD_REQUEST(HttpStatus.BAD_REQUEST.value(), 400, "잘못된 요청입니다"),
    SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR.value(), 500, "서버에러 입니다."),
    NULL_POINT(HttpStatus.INTERNAL_SERVER_ERROR.value(), 513, "Null Point"),
    INVALID_INPUT(HttpStatus.BAD_REQUEST.value(), 400, "유효하지 않은 input 입니다"),
    DENIED_ERROR(HttpStatus.FORBIDDEN.value(),403,"권한이 없습니다.");

    private final Integer httpStatusCode;
    private final Integer errorCode;
    private final String description;
}
