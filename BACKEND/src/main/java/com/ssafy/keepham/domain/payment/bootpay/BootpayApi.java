package com.ssafy.keepham.domain.payment.bootpay;


import kr.co.bootpay.Bootpay;
import kr.co.bootpay.model.request.*;
import kr.co.bootpay.model.response.ResDefault;

import java.util.HashMap;

public class BootpayApi {
    static Bootpay bootpay;
    static Double price;

    public static void main(String[] args) {

        bootpay = new Bootpay("64d0a56900be04001c699406", "rm6EYECr6aroQVG2ntW0A6LpWnkTgP4uQ3H18sDDUYw=");

        //토큰 발급
        goGetToken();

        //결제 검증
        getReceipt();

        //결제 취소 (전액 취소 / 부분 취소)
        receiptCancel();

        //사용자 토큰 발급
        getUserToken();

        // 결제 링크를 생성하는 기능
        requestLink(price);

        //서버 승인 요청
        confirm();

        //본인 인증 결과 조회
        certificate();
    }

    //토큰 발급
    public static void goGetToken() {
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


    //결제 취소 (전액 취소 / 부분 취소)
    public static void receiptCancel() {
        Cancel cancel = new Cancel();
        cancel.receiptId = "628b2206d01c7e00209b6087";
        cancel.cancelUsername = "관리자";
        cancel.cancelMessage = "테스트 결제";
//        cancel.price = 1000.0; //부분취소 요청시
//        cancel.cancelId = "12342134"; //부분취소 요청시, 중복 부분취소 요청하는 실수를 방지하고자 할때 지정
//        RefundData refund = new RefundData(); // 가상계좌 환불 요청시, 단 CMS 특약이 되어있어야만 환불요청이 가능하다.
//        refund.account = "675601012341234"; //환불계좌
//        refund.accountholder = "홍길동"; //환불계좌주
//        refund.bankcode = BankCode.getCode("국민은행");//은행코드
//        cancel.refund = refund;

        try {
            HashMap<String, Object> res = bootpay.receiptCancel(cancel);
            if(res.get("error_code") == null) { //success
                System.out.println("receiptCancel success: " + res);
            } else {
                System.out.println("receiptCancel false: " + res);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //사용자 토큰 발급
    public static void getUserToken() {
        UserToken userToken = new UserToken();
        userToken.userId = "1234"; // 개발사에서 관리하는 회원 고유 번호
        try {
            HashMap<String, Object> res = bootpay.getUserToken(userToken);
            if(res.get("error_code") == null) { //success
                System.out.println("getUserToken success: " + res);
            } else {
                System.out.println("getUserToken false: " + res);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 결제 링크를 생성하는 기능
    @Deprecated
    public static void requestLink(Double price) {
        Payload payload = new Payload();
        payload.orderId = "포인트";
        payload.price = price;
        payload.orderName = "포인트 결제";

        Extra extra = new Extra();
        extra.openType = "iframe";
        payload.extra = extra;

        try {
            ResDefault res = bootpay.requestLink(payload);
            System.out.println("requestLink:" + res.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //서버 승인 요청
    public static void confirm() {
        String receiptId = "62876963d01c7e00209b6028";
        try {
            HashMap<String, Object> res = bootpay.confirm(receiptId);
            if(res.get("error_code") == null) { //success
                System.out.println("confirm success: " + res);
            } else {
                System.out.println("confirm false: " + res);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //결제 검증
    public static void getReceipt() {
        String receiptId = "62b12f4b6262500007629fec";
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

    //본인 인증 결과 조회
    public static void certificate() {
        String receiptId = "628ae7ffd01c7e001e9b6066";
        try {
            HashMap<String, Object> res = bootpay.certificate(receiptId);
            if(res.get("error_code") == null) { //success
                System.out.println("certificate success: " + res);
            } else {
                System.out.println("certificate false: " + res);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
