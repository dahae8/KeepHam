package com.ssafy.keepham.domain.chat.consumer;

import com.ssafy.keepham.domain.chat.db.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class MessageListener {

    @Autowired
    SimpMessagingTemplate template;
    @KafkaListener(
            topics = "kafka-chat",
            groupId = "chatting"
    )
    public void listen(Message message){
        System.out.println("kafka 리스너를 통해 보내느중");
        template.convertAndSend("/topic/group/"+message.getRoomId(),message);
    }

}
