package com.ssafy.keepham.domain.chatroom.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.domain.chat.db.Message;
import com.ssafy.keepham.domain.chat.db.MessageRepository;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomRequest;
import com.ssafy.keepham.domain.chatroom.dto.ChatRoomResponse;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomManager;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*")
@RequestMapping("/api")
public class ChatRoomApiController {

    private final ChatRoomService chatRoomService;
    private final ChatRoomManager chatRoomManager;
    private final MessageRepository messageRepository;


    @PostMapping("/rooms/create")
    private Api<ChatRoomResponse> createRoom(
            @RequestBody ChatRoomRequest chatRoomRequest
    ){
        var res = chatRoomService.createRoom(chatRoomRequest);
        return Api.OK(res);
    }

    @GetMapping("/rooms")
    private Api<List<ChatRoomResponse>> findAllOpenedRoom(
//            @RequestParam ChatRoomStatus status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int pageSize
    ){
//        return Api.OK(chatRoomService.openedRoom(status, page, pageSize));
        return Api.OK(chatRoomService.openedRoom(ChatRoomStatus.OPEN, page, pageSize));
    }


}
