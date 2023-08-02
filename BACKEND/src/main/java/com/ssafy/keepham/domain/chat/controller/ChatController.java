package com.ssafy.keepham.domain.chat.controller;

import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.domain.chat.db.Message;
import com.ssafy.keepham.domain.chat.db.MessageRepository;
import com.ssafy.keepham.domain.chat.db.enums.Type;
import com.ssafy.keepham.domain.chatroom.service.ChatRoomManager;
import com.ssafy.keepham.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*")
public class ChatController {

    private final MessageRepository messageRepository;
    private final ChatRoomManager chatRoomManager;


    String topic = "kafka-chat";

      @GetMapping(value = "/chat-rooms/{roomId}/messages", produces = "application/json")
    public Api<List<Message>> getChatRoomMessages(@PathVariable Long roomId) {
        return Api.OK(messageRepository.findAllByRoomIdOrderByTimestampAsc(roomId));
    }

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/group/{roomId}")
    public Message sendMessageToRoom(@Payload Message message, @DestinationVariable Long roomId){
        log.info("message : {}", message);
//        messageRepository.save(message);
        return chatRoomManager.sendMessageToRoom(message, roomId);
    }

    @MessageMapping("/joinUser/{roomId}")
    @SendTo("/topic/group/{roomId}")
    public Message joinUser(@Payload Message message, @DestinationVariable Long roomId) {
        log.info("User '{}' joined/left chat room {}", message.getAuthor(), roomId);
        if (message.getType() == Type.ENTER) {
            chatRoomManager.userJoin(roomId, message.getAuthor());
        } else if (message.getType() == Type.EXIT) {
            chatRoomManager.userLeft(roomId, message.getAuthor());
        }
        return message;
    }



}
