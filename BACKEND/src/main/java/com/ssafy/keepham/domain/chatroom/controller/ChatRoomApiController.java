package com.ssafy.keepham.domain.chatroom.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.domain.chatroom.db.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.db.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomRequest;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomResponse;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*")
@RequestMapping("/api")
public class ChatRoomApiController {

    private final ChatRoomService chatRoomService;

    @PostMapping("/chatrooms")
    private Api<ChatRoomResponse> createRoom(
            @RequestBody ChatRoomRequest chatRoomRequest
    ){
        var res = chatRoomService.createRoom(chatRoomRequest);
        return Api.OK(res);
    }

}
