package com.ssafy.keepham.domain.chatroom.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.domain.chatroom.db.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.db.enums.ChatRoomStatus;
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
    private Api<ChatRoomEntity> createRoom(
            String title
    ){
        var room = ChatRoomEntity.builder()
                .title(title)
                .build();
        var res = chatRoomService.createRoom(room);
        return Api.OK(res);
    }

//    @GetMapping("")
//    private Api<List<ChatRoomEntity>> findOpenedChatRoom(){
//        var res = chatRoomService.openedRoom();
//        return Api.OK(res);
//    }
    @GetMapping("/chatrooms")
    public ResponseEntity<List<ChatRoomEntity>> getChatRooms() {
        List<ChatRoomEntity> chatRooms = chatRoomService.openedRoom();
        return ResponseEntity.ok(chatRooms);
    }
}
