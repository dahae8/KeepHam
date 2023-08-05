package com.ssafy.keepham.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum BoxError implements ErrorCodeIfs {
    BOX_NOT_FOUND(HttpStatus.NOT_FOUND.value(), 2404, "존재하지 않는 함입니다." ),
    BOX_BAD_REQUEST(HttpStatus.BAD_REQUEST.value(), 2400, "유효하니 않는 형식입니다.." ),
    ;

    private final Integer httpStatusCode;
    private final Integer errorCode;
    private final String description;
}
