package com.ssafy.keepham.domain.chatroom.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.domain.chatroom.db.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chatroom")
public class ChatRoomApiController {

    private final ChatRoomService chatRoomService;

    @PostMapping("/create")
    private Api<ChatRoomEntity> createRoom(
            @RequestBody ChatRoomEntity chatRoomEntity
    ){
        var res = chatRoomService.createRoom(chatRoomEntity);
        return Api.OK(res);
    }

    @GetMapping("")
    private Api<List<ChatRoomEntity>> findOpenedChatRoom(){
        var res = chatRoomService.openedRoom();
        return Api.OK(res);
    }
}
