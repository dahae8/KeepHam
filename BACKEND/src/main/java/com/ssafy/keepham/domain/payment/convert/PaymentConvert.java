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

    public Payment toChargeEntity(PaymentChargePointRequest pcpr){
        return Optional.ofNullable(pcpr)
                .map(it->{
                    return Payment.builder()
                            .userId(pcpr.getUserId())
                            .price(pcpr.getPrice())
                            .type(true)
                            .info("충전")
                            .build();
                }).orElseThrow(()->new ApiException(ErrorCode.NULL_POINT));
    }

    public Payment toEntity(PaymentRequest paymentRequest){
        return Optional.ofNullable(paymentRequest)
                .map(it -> {
                    return Payment.builder()
                            .userId(paymentRequest.getUserId())
                            .price(paymentRequest.getPrice())
                            .type(paymentRequest.isType())
                            .info(paymentRequest.getInfo())
                            .updateTime(paymentRequest.getUpdateTime())
                            .build();
                }).orElseThrow(()->new ApiException(ErrorCode.NULL_POINT));
    }

    public PaymentResponse toResponse(Payment payment){
        return Optional.ofNullable(payment)
                .map(it -> {
                    return PaymentResponse.builder()
                            .id(payment.getId())
                            .userId(payment.getUserId())
                            .price(payment.getPrice())
                            .type(payment.isType())
                            .info(payment.getInfo())
                            .updateTime(payment.getUpdateTime())
                            .build();
                }).orElseThrow(()->new ApiException(ErrorCode.NULL_POINT));
    }

}
