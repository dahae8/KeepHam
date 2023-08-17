package com.ssafy.keepham.domain.storePayment.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.common.error.StorePaymentError;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomManager;
import com.ssafy.keepham.domain.storePayment.dto.ConfirmSuperIdRequest;
import com.ssafy.keepham.domain.storePayment.dto.StorePaymentRequest;
import com.ssafy.keepham.domain.storePayment.service.StorePaymentService;
import com.ssafy.keepham.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*")
@RequestMapping("/api/payment/storeMenu")
public class StorePaymetController {

    private final UserService userService;
    private final ChatRoomManager chatRoomManager;
    private final StorePaymentService storePaymentService;

    //유저 메뉴 확정
    @Operation(summary = "유저 메뉴 확정")
    @PostMapping("/user")
    public Api<Object> saveUsermMenu(@RequestBody StorePaymentRequest storePaymentRequest){

        var userInfo = userService.getLoginUserInfo();
        String userNickName = userInfo.getNickName();

        return Api.OK(storePaymentService.saveUsermMenu(storePaymentRequest,userNickName));
    }

    //유저 메뉴 확정 최소
    @Operation(summary = "유저 메뉴 확정최소")
    @DeleteMapping("/user")
    public Api<Object> deleteUsermMenu(){

        var userInfo = userService.getLoginUserInfo();
        String userNickName = userInfo.getNickName();

        return Api.OK(storePaymentService.deleteByUserNickName(userNickName));
    }

    //방장 메뉴 확정
    @Operation(summary = "방장 메뉴 확정")
    @PostMapping("/manger")
    public Api<Object> confirmAllMenu(@RequestBody ConfirmSuperIdRequest confirmSuperIdRequest){

        Long roomId = confirmSuperIdRequest.getRoomId();
        storePaymentService.deleteStorePaymentUser(roomId);

        //방장확인
        var userInfo = userService.getLoginUserInfo();
        String userNickName = userInfo.getNickName();
        storePaymentService.getMangerId(roomId, userNickName);

        //인원수 확인
        Long countChatroom = chatRoomManager.getUserCountInChatRoom(roomId);
        Long countStorePaymet = storePaymentService.getcountStorePayment(roomId);
        if(!countChatroom.equals(countStorePaymet)){
            return Api.ERROR(StorePaymentError.DIFFERENT_USER_NUMBER,"채팅방인원수와 메뉴확정 완료한 인원수가 다릅니다.");
        }

        //배달비 + 금액해서 mysql 저장
        return Api.OK(storePaymentService.saveUserPayment(confirmSuperIdRequest,userNickName));


    }

    //유저 구매 확정
    @Operation(summary = "유저 구매 확정")
    @PostMapping("/user/{roomId}")
    public Api<Object> confirmUser(@PathVariable Long roomId){

        var userInfo = userService.getLoginUserInfo();
        String userNickName = userInfo.getNickName();


        return Api.OK(storePaymentService.confirmUser(userNickName,roomId));

    }

    //현재 메뉴 확정된 유저 목록 조회
    @Operation(summary = "현재 메뉴 확정된 유저 목록 조회")
    @GetMapping("/user/{roomId}")
    public  Api<Object> confirmAllUser(@PathVariable Long roomId){
        storePaymentService.deleteStorePaymentUser(roomId);
        return Api.OK(storePaymentService.confirmAllUser(roomId));
    }

    //유저별 확정된 메뉴 목록 조회
    @Operation(summary = "유저별 확정된 메뉴 목록 조회")
    @GetMapping("/user/menu/{roomId}")
    public  Api<Object> confirmUserMenu(@PathVariable Long roomId){
        storePaymentService.deleteStorePaymentUser(roomId);
        return Api.OK(storePaymentService.confirmUserMenu(roomId));
    }


}
