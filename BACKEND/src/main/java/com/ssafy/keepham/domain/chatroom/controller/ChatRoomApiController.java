package com.ssafy.keepham.domain.chatroom.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.domain.chatroom.dto.*;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomManager;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomService;
import com.ssafy.keepham.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class ChatRoomApiController {

    private final ChatRoomService chatRoomService;
    private final ChatRoomManager chatRoomManager;
    private final UserService userService;


    @Operation(summary = "방생성")
    @PostMapping("/rooms")
    private Api<ChatRoomResponse> createRoom(@Validated @RequestBody ChatRoomRequest chatRoomRequest){
        var userInfo = userService.getLoginUserInfo();
        var userNickName = userInfo.getNickName();
        chatRoomRequest.setSuperUserId(userNickName);
        var res = chatRoomService.createRoom(chatRoomRequest);
        return Api.OK(res);
    }

    @Operation(summary = "모든 채팅방 조회")
    @GetMapping("/rooms")
    private Api<List<ChatRoomResponse>> findAllOpenedRoom(
            @RequestParam ChatRoomStatus status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int pageSize
    ){
        return Api.OK(chatRoomService.openedRoom(status, page, pageSize));
    }

    @Operation(summary = "boxId로 채팅방 조회")
    @GetMapping("/rooms/{boxId}")
    private Api<List<ChatRoomResponse>> findRoomByBoxId(
            @PathVariable Long boxId,
            @RequestParam ChatRoomStatus status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int pageSize
    ){

        return Api.OK(chatRoomService.findRoomByBoxId(status, page, pageSize, boxId));
    }

    @Operation(summary = "zipCode로 채팅방 조회")
    @GetMapping("/rooms/zipcode/{zipCode}")
    private Api<List<ChatRoomResponse>> findAllRoomByZipCode(
            @PathVariable String zipCode,
            @RequestParam ChatRoomStatus status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int pageSize
    ){
        return Api.OK(chatRoomService.findAllRoomByZipCode(status, page, pageSize, zipCode));
    }


    @Operation(summary = "채팅방 입장. 비밀방일시 password 전달 필요")
    @PostMapping("/rooms/{roomId}")
    public Api<Object> enterSecretRoom(@PathVariable Long roomId, @RequestBody(required = false) RoomPassword password){
        var userInfo = userService.getLoginUserInfo();
        var userNickName = userInfo.getNickName();
        if (!chatRoomManager.isSecretRoom(roomId)){
            chatRoomManager.userJoin(roomId, userNickName);
            return Api.OK(userNickName);
        }

        if (chatRoomManager.isPasswordCorrect(roomId, password.getPassword())){
            chatRoomManager.userJoin(roomId, userNickName);
            return Api.OK(userNickName);
        } else {
            return Api.ERROR(ErrorCode.BAD_REQUEST, "방 비밀번호가 일치하지 않습니다.");
        }
    }

    @Operation(summary = "방 삭제 = 상태를 close로 변경")
    @PutMapping("/rooms/{roomId}")
    public Api<Boolean> closeRoom(@PathVariable Long roomId){
        chatRoomService.closeRoom(roomId);
        return Api.OK(true);
    }

    @Operation(summary = "해당 채팅방에 현재 유저 전부 삭제")
    @GetMapping("rooms/{roomId}/clear")
    public Api<String> clearRoom(@PathVariable Long roomId){
        chatRoomManager.allUserClear(roomId);
        return Api.OK("전체 삭제 성공");
    }

    @Operation(summary = "해당 채팅방의 모든 유저 닉네임 조회")
    @GetMapping("rooms/{roomId}/users")
    public Api<Set<String>> getAllUser(@PathVariable Long roomId){
        return Api.OK(chatRoomManager.getAllUser(roomId));
    }

    @Operation(summary = "해팅방 인원 중 랜덤으로 사람 뽑기")
    @GetMapping("/rooms/{roomId}/random")
    public Api<Set<String>> getRandomUser(@PathVariable Long roomId, @RequestParam int count){
        Set<String> users = chatRoomManager.getAllUser(roomId);
        Set<String> randomPick = chatRoomManager.pickRandomUsers(users, count);

        return Api.OK(randomPick);
    }

    @Operation(summary = "해당 채팅방의 방장을 바꾼다.")
    @PutMapping("/rooms/superUser")
    public Api<NewSuperUser> setSuperUser(@RequestBody NewSuperUser setSuperUser){
        chatRoomManager.setSuperUser(setSuperUser);
        return Api.OK(setSuperUser);
    }

    @Operation(summary = "채팅방의 종료 시간을 입력한 시간만큼 연장한다.")
    @PutMapping("/rooms/extend")
    public Api<ChatRoomResponse> extendRoomTime(@RequestBody ExtendRequest request){
        return Api.OK(chatRoomManager.extendRoomTime(request));
    }


}
