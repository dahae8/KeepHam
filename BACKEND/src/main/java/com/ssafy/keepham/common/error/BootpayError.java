package com.ssafy.keepham.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum BootpayError implements ErrorCodeIfs {
    BOOTPAY_TOKEN_ERROR(400,3404,"부트페이 토큰 발급과정에서 에러 발생"),
    BOOTPAY_PAYMENT_DETAIL_ERROR(400,3404,"부트페이 결제 내역 조회 불가"),
    BOOTPAY_NOT_EQUAL_PRICE(HttpStatus.BAD_REQUEST.value(),2400,"금액이 일치하지 않습니다."),
    BOOTPAY_NOT_COMPLETE_PAYMENT(HttpStatus.BAD_REQUEST.value(),2400,"결제완료 상태가 아닙니다.")
    ;

    private final Integer httpStatusCode;
    private final Integer errorCode;
    private final String description;
}
