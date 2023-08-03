package com.ssafy.keepham.domain.chatroom.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomRequest;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomResponse;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomManager;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomService;
import com.ssafy.keepham.security.TokenProvider;
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
            @RequestParam ChatRoomStatus status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int pageSize
    ){
        return Api.OK(chatRoomService.openedRoom(status, page, pageSize));
    }

    @GetMapping("/rooms/{boxId}")
    private Api<List<ChatRoomResponse>> findOpenedRoomByBoxId(
            @PathVariable Long boxId,
            @RequestParam ChatRoomStatus status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int pageSize
    ){
        return Api.OK(chatRoomService.findOpenedRoomByBoxId(status, page, pageSize, boxId));
    }


    @GetMapping("/{roomId}/enter")
    public Api<Object> enterRoom(@PathVariable Long roomId, @RequestHeader("Authorization") String token){
        String user = tokenProvider.validateTokenAndGetSubject(token);
        return Api.OK(user);
    }

    @GetMapping("/{roomId}/clear")
    public Api<String> clearRoom(@PathVariable Long roomId, @RequestHeader("Authorization") String token){
        chatRoomManager.allUserClear(roomId);
        return Api.OK("전체 삭제 성공");
    }



}
