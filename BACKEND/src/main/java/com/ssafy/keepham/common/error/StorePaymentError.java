package com.ssafy.keepham.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum StorePaymentError implements ErrorCodeIfs {
    DIFFERENT_USER_NUMBER(HttpStatus.BAD_REQUEST.value(), 4400, "인원수가 맞지않습니다."),
    ;

    private final Integer httpStatusCode;
    private final Integer errorCode;
    private final String description;
}
