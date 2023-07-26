package com.ssafy.keepham.domain.chat.controller;

import com.ssafy.keepham.domain.chat.db.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutionException;

@Slf4j
@RestController
@RequestMapping(value = "/api")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*")
public class ChatController {

    private final KafkaTemplate<String, Message> kafkaTemplate;
    String topic = "kafka-chat";

    @PostMapping(value = "/publish",consumes = "application/json", produces = "application/json")
    public void sendMessage(@RequestBody Message message) throws ExecutionException, InterruptedException {
        message.setTimestamp(LocalDateTime.now().toString());
        log.info("message:{}",message);
        kafkaTemplate.send(topic, message).get();

    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/group")
    public Message broadcastGroupMessage(@Payload Message message){
        return message;
    }

}
