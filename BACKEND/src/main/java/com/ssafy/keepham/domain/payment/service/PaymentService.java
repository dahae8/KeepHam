package com.ssafy.keepham.domain.payment.service;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.payment.convert.PaymentConvert;
import com.ssafy.keepham.domain.payment.dto.PaymentChargePointRequest;
import com.ssafy.keepham.domain.payment.dto.PaymentResponse;
import com.ssafy.keepham.domain.payment.entity.Payment;
import com.ssafy.keepham.domain.payment.repository.PaymentRepository;
import jakarta.validation.constraints.Null;
import kr.co.bootpay.Bootpay;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.connector.Response;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final PaymentConvert paymentConvert;

    //포인트 충전 저장
    public PaymentResponse chargePoint( int price,String userNickName){
        LocalDateTime currentDateTime = LocalDateTime.now();
        int totalpoint = price;

        Payment recentPayment =paymentRepository.getUserTotalPoint(userNickName);
        if(recentPayment != null){
            totalpoint += recentPayment.getTotalPoint();
        }

        Payment payment = new Payment();

        payment.setUserNickName(userNickName);
        payment.setInfo("충전");
        payment.setPrice(price);
        payment.setTotalPoint(totalpoint);
        payment.setInsertTime(currentDateTime);
        payment.setChatroomId(-1);
        payment.setAgreement(true);

        return paymentConvert.toResponse( paymentRepository.save(payment));
    }

    // 로그인된 유저의 포인트내역 조회
    public List<PaymentResponse> getUserPaymentDetail(String userNickName){
        List<PaymentResponse> resList = new ArrayList<>();

        List<Payment> payments= paymentRepository.getByUserNickName(userNickName);

        for(Payment payment : payments){
            PaymentResponse res = paymentConvert.toResponse(payment);
            resList.add(res);
        }
        return resList;
    }

    // 포인트 전액 인출
    public PaymentResponse refundUserPoint(String userNickName){
        LocalDateTime currentDateTime = LocalDateTime.now();
        Payment recentPayment =paymentRepository.getUserTotalPoint(userNickName);

        int price = -1*recentPayment.getTotalPoint();

        Payment payment = new Payment();
        payment.setUserNickName(recentPayment.getUserNickName());
        payment.setInfo("환불");
        payment.setPrice(price);
        payment.setTotalPoint(0);
        payment.setInsertTime(currentDateTime);
        payment.setChatroomId(-1);
        payment.setAgreement(true);

        return paymentConvert.toResponse( paymentRepository.save(recentPayment));
    }

    //로그인된 유저의 총 포인트 조회
    public int getUserTotalPoint(String userNickName){
        Payment recentPayment =paymentRepository.getUserTotalPoint(userNickName);

        if(recentPayment==null){
            return 0;
        }
        else {
            return recentPayment.getTotalPoint();
        }

    }

    //!!!테스트용!!! 금액에대한 가게에서 구입한 포인트 더미데이터 추가
    public PaymentResponse testInsertPrice (String userNickName, int price){
        LocalDateTime currentDateTime = LocalDateTime.now();

        int totalpoint = -1*price;
        Payment recentPayment =paymentRepository.getUserTotalPoint(userNickName);
        if(recentPayment != null){
            totalpoint += recentPayment.getTotalPoint();
        }

        Payment payment = new Payment();
        payment.setUserNickName(userNickName);
        payment.setInfo("가게명");
        payment.setPrice(-1*price);
        payment.setTotalPoint(totalpoint);
        payment.setInsertTime(currentDateTime);
        payment.setChatroomId(-1);
        payment.setAgreement(true);

        return paymentConvert.toResponse( paymentRepository.save(payment));
    }
}
