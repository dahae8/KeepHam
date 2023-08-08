package com.ssafy.keepham.domain.payment.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.domain.payment.dto.PaymentChargePointRequest;
import com.ssafy.keepham.domain.payment.dto.PaymentResponse;
import com.ssafy.keepham.domain.payment.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {
    private final PaymentService paymentService;

    //포인트 충전
    @Operation(summary = "포인트 충전")
    @PostMapping()
    public Api<PaymentResponse> getAddressAllBox(@RequestBody PaymentChargePointRequest pcpr){
        return Api.OK(paymentService.saveChargePayment(pcpr));
    }

}
