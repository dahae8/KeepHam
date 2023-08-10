package com.ssafy.keepham.domain.storepayment.controller;

import com.ssafy.keepham.domain.storepayment.service.StorePaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*")
@RequestMapping("/api/payment/store")
public class StorePaymetController {
    private final StorePaymentService storePaymentService;

    //유저 메뉴 확정

    //방장 메뉴 확정

    //유저 구메 확정

}
