package com.ssafy.keepham.domain.storepayment.service;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.chatroom.repository.ChatRoomRepository;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomManager;
import com.ssafy.keepham.domain.payment.entity.Payment;
import com.ssafy.keepham.domain.payment.repository.PaymentRepository;
import com.ssafy.keepham.domain.payment.service.PaymentService;
import com.ssafy.keepham.domain.storepayment.convert.StorePaymentConvert;
import com.ssafy.keepham.domain.storepayment.dto.ConfirmSuperIdRequest;
import com.ssafy.keepham.domain.storepayment.dto.PaymentUserResponse;
import com.ssafy.keepham.domain.storepayment.dto.StorePaymentRequest;
import com.ssafy.keepham.domain.storepayment.dto.StorePaymentResponse;
import com.ssafy.keepham.domain.storepayment.entity.StorePayment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class StorePaymentService {
    private final RedisTemplate<String, StorePayment> storePaymentRedisTemplate;
    private final PaymentRepository paymentRepository;
    private final StorePaymentConvert storePaymentConvert;
    private final ChatRoomRepository chatRoomRepository;
    private final PaymentService paymentService;
    private final ChatRoomManager chatRoomManager;

    //유저 메뉴 확정
    public StorePaymentResponse saveUsermMenu(StorePaymentRequest storePaymentRequest, String userNickName) {
        var entity = storePaymentConvert.toEntity(storePaymentRequest, userNickName);
        return Optional.ofNullable(entity)
                .map(it -> {
                    storePaymentRedisTemplate.opsForValue().set("StorePayment:" + it.getId(), it);
                    return storePaymentConvert.toResponse(it);
                })
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST));
    }


    //유저 메뉴 확정 최소
    public HashMap<String, Object> deleteByUserNickName(String userNickName) {
        HashMap<String, Object> res = new HashMap<>();

        StorePayment storePayment = storePaymentRedisTemplate.opsForValue().get("StorePayment:" + userNickName);

        if (storePayment != null) {
            storePaymentRedisTemplate.delete("StorePayment:" + userNickName);
            res.put("result", String.format("[%s]의 메뉴확정내역이 삭제되었습니다.", userNickName));
        } else {
            res.put("result", String.format("[%s]의 메뉴확정내역이 없습니다.", userNickName));
        }

        return res;
    }


    //roomId에 해당하는 유저 수 확인하기
    public Long getcountStorePayment(Long roomId) {
        var room = Optional.ofNullable(chatRoomRepository.findFirstByIdAndStatus(roomId, ChatRoomStatus.OPEN))
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST, "존재하지 않는 채팅방입니다."));

        // Redis에서 데이터 조회
        return storePaymentRedisTemplate.opsForSet().size("StorePayment:roomId:" + roomId);
    }

    //채팅방 방장 id 가져오기
    public void getMangerId(Long roomId, String loginUser ){

        var room = Optional.ofNullable(chatRoomRepository.findFirstByIdAndStatus(roomId, ChatRoomStatus.OPEN))
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST, "존재하지 않는 채팅방입니다."));

        if (!loginUser.equals(room.getSuperUserId())){
            throw new ApiException(ErrorCode.BAD_REQUEST, "구매 확정을 요청한 유저가 방장이 아닙니다.");
        }
    }

    //방장 정보 삭제
    public void deleteStorePayment(String userNickName) {
        storePaymentRedisTemplate.delete("StorePayment:" + userNickName);
    }

    //배달비 + 금액해서 mysql 저장
    public List<PaymentUserResponse> saveUserPayment(ConfirmSuperIdRequest confirmSuperIdRequest){
        int dividedDeliveryfee = confirmSuperIdRequest.getDividedDeliveryfee();
        List<PaymentUserResponse> resList = new ArrayList<>();

        Set<StorePayment> storePaymentList = storePaymentRedisTemplate.opsForSet()
                .members("StorePayment:roomId:" + confirmSuperIdRequest.getRoomId());

        for(StorePayment storePayment : storePaymentList){

            String userNickName = storePayment.getUserNickName();
            int totalPoint = paymentService.getUserTotalPoint(userNickName);
            totalPoint -=storePayment.getPrice();
            totalPoint -=dividedDeliveryfee;

            Payment payment = storePaymentConvert.toPayment(storePayment, dividedDeliveryfee, totalPoint);

            PaymentUserResponse res = storePaymentConvert.toResponsePayment(paymentRepository.save(payment));
            resList.add(res);
        }
        return resList;
    }

    //유저 구매 확정
    public PaymentUserResponse confirmUser(String userNickName, Long roomId){
        //payment true 전환
        Payment payment = Optional.ofNullable(paymentRepository.findByUserNickNameAndChatroomIdAndAgreement(userNickName,roomId,false))
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST, "매뉴 선정 내역이 존재하지 않습니다."));

        payment.setAgreement(true);

        PaymentUserResponse res = storePaymentConvert.toResponsePayment(paymentRepository.save(payment));

        //모든 인원 true인지 확인 모두 true이면 방장 point 증가
        List<Payment> listPayment = paymentRepository.findAllByChatroomIdAndAgreement(roomId,true);
        Long numberTrue = (long) listPayment.size();
        Long countChatroom = chatRoomManager.getUserCountInChatRoom(roomId);

        if( numberTrue == countChatroom-1 ){
            int price=0;
            for(Payment pay : listPayment){
                price+=pay.getPrice();
            }

            int totalpoint = -1*price;
            totalpoint += paymentService.getUserTotalPoint(userNickName);

            LocalDateTime currentDateTime = LocalDateTime.now();

            Payment savePayment = new Payment();
            savePayment.setUserNickName(userNickName);
            savePayment.setInfo(listPayment.get(0).getInfo());
            savePayment.setPrice(-1*price);
            savePayment.setTotalPoint(totalpoint);
            savePayment.setInsertTime(currentDateTime);
            savePayment.setChatroomId(roomId);
            savePayment.setAgreement(true);

            paymentRepository.save(savePayment);

        }

        return res;

    }

}
