package com.ssafy.keepham.domain.chatroom.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.domain.chat.db.Message;
import com.ssafy.keepham.domain.chat.db.MessageRepository;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomRequest;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomResponse;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomManager;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomService;
import com.ssafy.keepham.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "http://localhost:3000")
@RequestMapping("/api")
public class ChatRoomApiController {

    private final ChatRoomService chatRoomService;
    private final ChatRoomManager chatRoomManager;
    private final TokenProvider tokenProvider;


    @PostMapping("/rooms/create")
    private Api<ChatRoomResponse> createRoom(
            @RequestBody ChatRoomRequest chatRoomRequest,
            @RequestHeader("Authorization") String token
    ){
        var user = tokenProvider.validateTokenAndGetSubject(token);
        chatRoomRequest.setSuperUserId(user);
        var res = chatRoomService.createRoom(chatRoomRequest);
        return Api.OK(res);
    }

    @GetMapping("/rooms")
    private Api<List<ChatRoomResponse>> findAllOpenedRoom(
//            @RequestParam ChatRoomStatus status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int pageSize,
            @RequestHeader("Authorization") String token
    ){
//        return Api.OK(chatRoomService.openedRoom(status, page, pageSize));
        System.out.println("방 목록 토큰 : " + token);
        tokenProvider.validateTokenAndGetSubject(token);
        return Api.OK(chatRoomService.openedRoom(ChatRoomStatus.OPEN, page, pageSize));
    }

    @GetMapping("/rooms/{roomId}/isFull")
    private Api<Boolean> isFull(@PathVariable Long roomId, @RequestHeader("Authorization") String token){
        tokenProvider.validateTokenAndGetSubject(token);
        return Api.OK(chatRoomManager.isChatRoomFull(roomId));
    }

    @GetMapping("/{roomId}/enter")
    public Api<Map<String, String>> enterRoom(@PathVariable Long roomId, @RequestHeader("Authorization") String token){
        String user = tokenProvider.validateTokenAndGetSubject(token);
        chatRoomManager.userJoin(roomId, user);
        Map<String, String> res = new HashMap<>();
        res.put("userId", user);
        return Api.OK(res);
    }


}
