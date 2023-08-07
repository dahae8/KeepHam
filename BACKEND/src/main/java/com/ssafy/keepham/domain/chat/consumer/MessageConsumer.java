package com.ssafy.keepham.domain.chat.consumer;

import com.ssafy.keepham.domain.chat.db.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class MessageConsumer {

    private final SimpMessagingTemplate messagingTemplate;

    @KafkaListener(topics = "kafka-chat", groupId = "chatting-" + "${random.uuid}")
    public void getMessage(Message message){
        log.info("리스너를 통해 전달중");
        messagingTemplate.convertAndSend("/subscribe/message/" + message.getRoomId(), message);
    }

}
