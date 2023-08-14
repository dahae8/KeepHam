package com.ssafy.keepham.domain.storePayment.convert;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.payment.entity.Payment;
import com.ssafy.keepham.domain.storePayment.dto.PaymentUserResponse;
import com.ssafy.keepham.domain.storePayment.dto.StorePaymentRequest;
import com.ssafy.keepham.domain.storePayment.dto.StorePaymentResponse;
import com.ssafy.keepham.domain.storePayment.entity.StorePayment;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;

@Component
public class StorePaymentConvert {

    public StorePayment toEntity(StorePaymentRequest storePaymentRequest, String userNickName){
        return Optional.ofNullable(storePaymentRequest)
                .map(it -> {
                    return StorePayment.builder()
                            .roomId(storePaymentRequest.getRoomId())
                            .userNickName(userNickName)
                            .store(storePaymentRequest.getStore())
                            .price(storePaymentRequest.getPrice())
                            .build();
                }).orElseThrow(()->new ApiException(ErrorCode.NULL_POINT));
    }

    public StorePaymentResponse toResponse(StorePayment storePayment){

        return Optional.ofNullable(storePayment)
                .map(it -> {
                    return StorePaymentResponse.builder()
                            .roomId(storePayment.getRoomId())
                            .userNickName(storePayment.getUserNickName())
                            .store(storePayment.getStore())
                            .price(storePayment.getPrice())
                            .build();
                }).orElseThrow(()->new ApiException(ErrorCode.NULL_POINT));

    }


    public Payment toPayment(StorePayment storePayment,int dividedDeliveryfee, int totalPoint ){
        LocalDateTime currentDateTime = LocalDateTime.now();
        return Optional.ofNullable(storePayment)
                .map(it -> {
                    return Payment.builder()
                            .userNickName(storePayment.getUserNickName())
                            .info(storePayment.getStore())
                            .price(-1*(storePayment.getPrice()+dividedDeliveryfee))
                            .totalPoint(totalPoint)
                            .chatroomId(storePayment.getRoomId())
                            .agreement(false)
                            .insertTime(currentDateTime)
                            .build();
                }).orElseThrow(()->new ApiException(ErrorCode.NULL_POINT));
    }

    public PaymentUserResponse toResponsePayment(Payment payment){
        return Optional.ofNullable(payment)
                .map(it -> {
                    return PaymentUserResponse.builder()
                            .userNickName(payment.getUserNickName())
                            .info(payment.getInfo())
                            .price(payment.getPrice())
                            .totalPoint(payment.getTotalPoint())
                            .chatroomId(payment.getChatroomId())
                            .agreement(payment.isAgreement())
                            .build();
                }).orElseThrow(()->new ApiException(ErrorCode.NULL_POINT));
    }

}

