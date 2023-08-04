package com.ssafy.keepham.domain.chat.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.domain.chat.db.Message;
import com.ssafy.keepham.domain.chat.db.MessageRepository;
import com.ssafy.keepham.domain.chat.db.enums.Type;
import com.ssafy.keepham.domain.chat.service.MessageService;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomManager;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*")
public class ChatController {

    private final MessageService messageService;
    private final ChatRoomManager chatRoomManager;


    String topic = "kafka-chat";

    @Operation(summary = "roomId로 해당 채팅방의 채팅내역 조회")
    @GetMapping(value = "/chat-rooms/{roomId}/messages", produces = "application/json")
    public Api<List<Message>> getChatRoomMessages(@PathVariable Long roomId) {
        return Api.OK(messageService.findMessageLog(roomId));
    }

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/group/{roomId}")
    public Message sendMessageToRoom(@Payload Message message, @DestinationVariable Long roomId){
        log.info("message : {}", message);
        return chatRoomManager.sendMessageToRoom(message, roomId);
    }

    @MessageMapping("/joinUser/{roomId}")
    @SendTo("/topic/group/{roomId}")
    public Message joinUser(@Payload Message message, @DestinationVariable Long roomId) {
        log.info("joinUser/{roomId}로 발송된 메세지 : {}", message);
        if (message.getType() == Type.ENTER) {
            log.info("User '{}' joined chat room {}", message.getAuthor(), roomId);
        } else if (message.getType() == Type.EXIT) {
            log.info("User '{}' left chat room {}", message.getAuthor(), roomId);
            chatRoomManager.userLeft(roomId, message.getAuthor());
        }
        return message;
    }

}
