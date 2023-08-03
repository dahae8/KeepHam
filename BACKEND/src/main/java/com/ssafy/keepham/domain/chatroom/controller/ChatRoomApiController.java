package com.ssafy.keepham.domain.chatroom.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomRequest;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomResponse;
import com.ssafy.keepham.domain.chatroom.dto.RoomPassword;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomManager;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomService;
import com.ssafy.keepham.security.TokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*")
@RequestMapping("/api")
public class ChatRoomApiController {

    private final ChatRoomService chatRoomService;
    private final ChatRoomManager chatRoomManager;
    private final TokenProvider tokenProvider;

    @Operation(summary = "방생성")
    @PostMapping("/rooms")
    private Api<ChatRoomResponse> createRoom(
            @RequestBody ChatRoomRequest chatRoomRequest,
            @RequestHeader("Authorization") String token
    ){
        var subject = tokenProvider.validateTokenAndGetSubject(token);
        var userId =  tokenProvider.getUserFromSubject(subject).getUserId();
        chatRoomRequest.setSuperUserId(userId);
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
    private Api<List<ChatRoomResponse>> findOpenedRoomByBoxId(
            @PathVariable Long boxId,
            @RequestParam ChatRoomStatus status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int pageSize
    ){
        return Api.OK(chatRoomService.findOpenedRoomByBoxId(status, page, pageSize, boxId));
    }

    @Operation(summary = "채팅방 입장")
    @GetMapping("/{roomId}")
    public Api<Object> enterRoom(@PathVariable Long roomId, @RequestHeader("Authorization") String token){
        String subject = tokenProvider.validateTokenAndGetSubject(token);
        var nickName = tokenProvider.getUserFromSubject(subject).getNickName();
        chatRoomManager.userJoin(roomId, nickName);
        return Api.OK(nickName);
    }

    @Operation(summary = "암호가 걸린 방 입장")
    @PostMapping("/{roomId}")
    public Api<Object> enterSecretRoom(@PathVariable Long roomId, @RequestBody RoomPassword password, @RequestHeader("Authorization") String token){
        String subject = tokenProvider.validateTokenAndGetSubject(token);
        var nickName = tokenProvider.getUserFromSubject(subject).getNickName();
        if (chatRoomManager.isPasswordCorrect(roomId, password.getPassword())){
            chatRoomManager.userJoin(roomId, nickName);
            return Api.OK(nickName);
        } else {
            return Api.ERROR(ErrorCode.BAD_REQUEST, "방 비밀번호가 일치하지 않습니다.");
        }
    }

    @Operation(summary = "해당 채팅방에 현재 유저 전부 삭제")
    @GetMapping("/{roomId}/clear")
    public Api<String> clearRoom(@PathVariable Long roomId, @RequestHeader("Authorization") String token){
        chatRoomManager.allUserClear(roomId);
        return Api.OK("전체 삭제 성공");
    }

    @Operation(summary = "해당 채팅방의 모든 유저 닉네임 조회")
    @GetMapping("/{roomId}/allUser")
    private Api<Set<String>> getAllUser(@PathVariable Long roomId, @RequestHeader("Authorization") String token){
        tokenProvider.validateTokenAndGetSubject(token);
        return Api.OK(chatRoomManager.getAllUser(roomId));
    }



}
