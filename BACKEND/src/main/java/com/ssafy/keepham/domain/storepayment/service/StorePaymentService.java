package com.ssafy.keepham.domain.storePayment.service;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.chatroom.entity.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.chatroom.repository.ChatRoomRepository;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomManager;
import com.ssafy.keepham.domain.payment.entity.Payment;
import com.ssafy.keepham.domain.payment.repository.PaymentRepository;
import com.ssafy.keepham.domain.payment.service.PaymentService;
import com.ssafy.keepham.domain.storePayment.dto.UserMenuPrice;
import com.ssafy.keepham.domain.storePayment.repository.StorePaymentRepository;
import com.ssafy.keepham.domain.storePayment.convert.StorePaymentConvert;
import com.ssafy.keepham.domain.storePayment.dto.ConfirmSuperIdRequest;
import com.ssafy.keepham.domain.storePayment.dto.PaymentUserResponse;
import com.ssafy.keepham.domain.storePayment.dto.StorePaymentRequest;
import com.ssafy.keepham.domain.storePayment.dto.StorePaymentResponse;
import com.ssafy.keepham.domain.storePayment.entity.StorePayment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class StorePaymentService {
    private final StorePaymentRepository storePaymentRepository;

    private final PaymentRepository paymentRepository;
    private final StorePaymentConvert storePaymentConvert;
    private final ChatRoomRepository chatRoomRepository;
    private final PaymentService paymentService;
    private final ChatRoomManager chatRoomManager;

    //유저 메뉴 확정
    public List<StorePaymentResponse> saveUsermMenu(StorePaymentRequest storePaymentRequest, String userNickName) {

        StorePayment checkDB = storePaymentRepository.findFirstByUserNickName(userNickName);
        if(checkDB != null ){
            throw new ApiException(ErrorCode.BAD_REQUEST,"이미 메뉴확정 되었습니다.");
        }

        List<StorePaymentResponse> resList = new ArrayList<>();

        for(UserMenuPrice userMenu : storePaymentRequest.getMenus()){
            StorePayment storePayment = new StorePayment();
            storePayment.setRoomId(storePaymentRequest.getRoomId());
            storePayment.setUserNickName(userNickName);
            storePayment.setStore(storePaymentRequest.getStoreName());

            storePayment.setMenu(userMenu.getMenu());
            storePayment.setCount(userMenu.getCount());
            storePayment.setPrice(userMenu.getPrice());
            StorePaymentResponse res = storePaymentConvert.toResponse(storePaymentRepository.save(storePayment));
            resList.add(res);
        }
        return resList;

    }


    //유저 메뉴 확정 최소
    public HashMap<String, Object> deleteByUserNickName(String userNickName) {
        HashMap<String, Object> res = new HashMap<>();

        StorePayment storePayment = storePaymentRepository.findFirstByUserNickName(userNickName);

        if (storePayment != null) {
            storePaymentRepository.deleteByUserNickName(userNickName);
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

        List<StorePayment> storePayments = storePaymentRepository.findByRoomId(roomId);
        Set<String> uniqueUserNickNames = new HashSet<>();

        for (StorePayment storePayment : storePayments) {
            uniqueUserNickNames.add(storePayment.getUserNickName());
        }

        return (long) uniqueUserNickNames.size();
    }

    //채팅방 방장 id 가져오기
    public void getMangerId(Long roomId, String loginUser ){

        var room = Optional.ofNullable(chatRoomRepository.findFirstByIdAndStatus(roomId, ChatRoomStatus.OPEN))
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST, "존재하지 않는 채팅방입니다."));

        if (!loginUser.equals(room.getSuperUserId())){
            throw new ApiException(ErrorCode.BAD_REQUEST, "구매 확정을 요청한 유저가 방장이 아닙니다.");
        }
    }

    //배달비 + 금액해서 mysql 저장
    public List<PaymentUserResponse> saveUserPayment(ConfirmSuperIdRequest confirmSuperIdRequest,String userNickName) {
        int dividedDeliveryfee = confirmSuperIdRequest.getDividedDeliveryfee();
        List<PaymentUserResponse> resList = new ArrayList<>();

        //체팅방 유저 목록
        Set<String> ids = chatRoomManager.getAllUser(confirmSuperIdRequest.getRoomId());
        for (String id : ids) {
            //빙징 제외
            if (id.equals(userNickName)) {
                storePaymentRepository.deleteByUserNickName(id);
                continue;
            }

            List<StorePayment> storePaymentList = storePaymentRepository.findByUserNickName(id);
            System.out.println("~~~~~"+storePaymentList.size());
            int price = confirmSuperIdRequest.getDividedDeliveryfee();
            for (StorePayment sp : storePaymentList) {
                price = price + (sp.getPrice() * sp.getCount());
            }
            StorePayment storePayment = storePaymentList.get(0);

            int totalPoint = paymentService.getUserTotalPoint(id);
            LocalDateTime currentDateTime = LocalDateTime.now();

            Payment payment = new Payment();
            payment.setUserNickName(id);
            payment.setInfo(storePayment.getStore());
            payment.setPrice(-1 * price);
            payment.setTotalPoint(totalPoint - price);
            payment.setInsertTime(currentDateTime);
            payment.setChatroomId(storePayment.getRoomId());
            payment.setAgreement(false);

            PaymentUserResponse res = storePaymentConvert.toResponsePayment(paymentRepository.save(payment));
            resList.add(res);

            storePaymentRepository.deleteByUserNickName(id);

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

        System.out.println(numberTrue+" : "+ (countChatroom-1));
        if( numberTrue == countChatroom-1 ){
            int price=0;
            for(Payment pay : listPayment){
                price+=pay.getPrice();
            }

            ChatRoomEntity room = Optional.ofNullable(chatRoomRepository.findFirstById(roomId))
                    .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST, "존재하지 않는 채팅방입니다."));

            LocalDateTime currentDateTime = LocalDateTime.now();

            System.out.println(room.getSuperUserId());

            int totalpoint =  paymentService.getUserTotalPoint(room.getSuperUserId())-price;

            Payment savePayment = new Payment();
            savePayment.setUserNickName(room.getSuperUserId());
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
