package com.ssafy.keepham.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ChatRoomError implements ErrorCodeIfs {

    OK(HttpStatus.OK.value(), 200, "성공"),
    BAD_REQUEST(HttpStatus.BAD_REQUEST.value(), 5400, "풀방입니다."),
    SECRET_ROOM(HttpStatus.BAD_REQUEST.value(), 5500, "비밀방입니다."),

    ;
    private final Integer httpStatusCode;
    private final Integer errorCode;
    private final String description;
}
