package com.ssafy.keepham.domain.payment.service;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.payment.convert.PaymentConvert;
import com.ssafy.keepham.domain.payment.dto.PaymentChargePointRequest;
import com.ssafy.keepham.domain.payment.dto.PaymentResponse;
import com.ssafy.keepham.domain.payment.repository.PaymentRepository;
import kr.co.bootpay.Bootpay;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final PaymentConvert paymentConvert;

    //포인트 충전 저장
    public PaymentResponse chargePoint(PaymentChargePointRequest pcpr){

        var entity = paymentConvert.toChargeEntity(pcpr);
        return Optional.ofNullable(entity)
                .map(it -> {

                    paymentRepository.save(entity);
                    return paymentConvert.toResponse(entity);
                })
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST));
    }



}
