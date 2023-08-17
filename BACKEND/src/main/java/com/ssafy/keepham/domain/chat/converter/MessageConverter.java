package com.ssafy.keepham.domain.chat.converter;

import com.ssafy.keepham.domain.chat.entity.Message;
import com.ssafy.keepham.domain.chat.dto.MessageResponse;
import org.springframework.stereotype.Component;

import java.time.LocalTime;

@Component
public class MessageConverter {

    public MessageResponse toResponse(Message message){
        return MessageResponse.builder()
                .author(message.getAuthor())
                .boxId(message.getBoxId())
                .id(message.getId())
                .type(message.getType())
                .roomId(message.getRoomId())
                .content(message.getContent())
                .timestamp(LocalTime.of(message.getTimestamp().getHour(),
                        message.getTimestamp().getMinute(),message.getTimestamp().getSecond()))
                .build();
    }
}
