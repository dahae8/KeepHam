package com.ssafy.keepham.domain.payment.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.common.error.BootpayError;
import com.ssafy.keepham.domain.payment.dto.PaymentChargePointRequest;
import com.ssafy.keepham.domain.payment.service.BootpayService;
import com.ssafy.keepham.domain.payment.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {
    private final PaymentService paymentService;
    private final BootpayService bootpayService;

    //포인트 충전
    @Operation(summary = "포인트 충전")
    @PostMapping("/charge")
    public Api<Object> chargePoint(@RequestBody PaymentChargePointRequest pcpr){

        //토큰발급
        HashMap<String, Object> token = bootpayService.goGetToken();
        if(token.get("error_code") != null){
            return Api.ERROR(BootpayError.BOOTPAY_TOKEN_ERROR, String.format("[%s]애러 발생",token.get("error_code")));
        }


        //부트페이 결제 조회
        HashMap<String, Object> paymentDetail = bootpayService.checkPaymentDetail(pcpr.getReceiptId());
        if(paymentDetail.get("error_code") != null){
            return Api.ERROR(BootpayError.BOOTPAY_PAYMENT_DETAIL_ERROR, String.format("[%s]애러 발생",token.get("error_code")));
        }

        /*
        부트페이 결제 비교
         1. price 비교
         2.status가 1인지 확인하기
        */
        int price = ((Number) paymentDetail.get("price")).intValue();
        int status = ((Number) paymentDetail.get("status")).intValue();

        if(price != pcpr.getPrice()){
            return Api.ERROR(BootpayError.BOOTPAY_NOT_EQUAL_PRICE, String.format("요청 금액[%d 원]와 부트페이에서 조회된 결제금액[%d 원]이 다릅니다. ",pcpr.getPrice(),price));
        }
        else if(status != 1){
            return Api.ERROR(BootpayError.BOOTPAY_NOT_COMPLETE_PAYMENT, String.format("부트페이에서 조회된 상태[%d]가 결제왼료 상태가 아닙니다.",status));
        }


        return Api.OK(paymentService.chargePoint(pcpr));
    }

}
