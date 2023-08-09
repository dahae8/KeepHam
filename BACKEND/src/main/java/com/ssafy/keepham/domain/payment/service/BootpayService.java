package com.ssafy.keepham.domain.payment.service;

import kr.co.bootpay.Bootpay;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class BootpayService {

    private final Bootpay bootpay = new Bootpay("64d0a56900be04001c699406", "Y83Y97IVqZWtTExCXkokpA7as0wUycSTs6wDz1a0ppI==");

    //토큰 발급
    public HashMap<String, Object> goGetToken() {
        try {
            HashMap<String, Object> res = bootpay.getAccessToken();

            return res;

        } catch (Exception e) {
            e.printStackTrace();
            HashMap<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error_code", e.getMessage());
            return errorResponse;
        }
    }

    //결제 검증
    private void getReceipt(String receiptId ) {
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


    //결제 단건 조회
    public HashMap<String, Object> checkPaymentDetail(String receiptId){
        try {
            HashMap<String, Object> res = bootpay.getReceipt(receiptId);
            if(res.get("error_code") == null) { //success
                System.out.println("confirm success: " + res);
            } else {
                System.out.println("confirm false: " + res);
            }
            return res;
        } catch (Exception e) {
            e.printStackTrace();

            HashMap<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error_code", e.getMessage());
            return errorResponse;
        }
    }
}
