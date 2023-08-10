package com.ssafy.keepham.domain.payment.convert;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.payment.dto.PaymentChargePointRequest;
import com.ssafy.keepham.domain.payment.dto.PaymentRequest;
import com.ssafy.keepham.domain.payment.dto.PaymentResponse;
import com.ssafy.keepham.domain.payment.entity.Payment;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PaymentConvert {


    public PaymentResponse toResponse(Payment payment){
        return Optional.ofNullable(payment)
                .map(it -> {
                    return PaymentResponse.builder()
                            .info(payment.getInfo())
                            .price(payment.getPrice())
                            .totalPoint(payment.getTotalPoint())
                            .insertTime(payment.getInsertTime())
                            .build();
                }).orElseThrow(()->new ApiException(ErrorCode.NULL_POINT));
    }

}
