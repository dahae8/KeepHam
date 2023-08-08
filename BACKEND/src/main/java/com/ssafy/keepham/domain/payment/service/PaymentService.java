package com.ssafy.keepham.domain.payment.service;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.payment.bootpay.BootpayApi;
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

    static Bootpay bootpay = new Bootpay("64d0a56900be04001c699406", "rm6EYECr6aroQVG2ntW0A6LpWnkTgP4uQ3H18sDDUYw=");


    //포인트 충전 저장
    public PaymentResponse saveChargePayment(PaymentChargePointRequest pcpr){
        var entity = paymentConvert.toChargeEntity(pcpr);
        String receiptId = pcpr.getReceiptId();
        return Optional.ofNullable(entity)
                .map(it -> {

                    paymentRepository.save(entity);
                    return paymentConvert.toResponse(entity);
                })
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST));
    }

    //토큰 발급
    private static void goGetToken() {
        try {
            HashMap<String, Object> res = bootpay.getAccessToken();
            if(res.get("error_code") == null) { //success
                System.out.println("goGetToken success: " + res);
            } else {
                System.out.println("goGetToken false: " + res);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
6TGG G
    //결제 검증
    private static void getReceipt(String receiptId ) {
        try {
            HashMap<String, Object> res = bootpay.getReceipt(receiptId);
            if(res.get("error_code") == null) { //success
                System.out.println("getReceipt success: " + res);
            } else {
                System.out.println("getReceipt false: " + res);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
