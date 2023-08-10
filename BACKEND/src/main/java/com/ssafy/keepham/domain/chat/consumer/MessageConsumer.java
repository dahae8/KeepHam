package com.ssafy.keepham.domain.chat.consumer;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.box.entity.Box;
import com.ssafy.keepham.domain.box.repository.BoxRepository;
import com.ssafy.keepham.domain.chat.db.Message;
import com.ssafy.keepham.domain.chatroom.entity.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.chatroom.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.PropertySource;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
@PropertySource("classpath:kafka.properties")
public class MessageConsumer {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatRoomRepository chatRoomRepository;

    @KafkaListener(topics = "${kafka.chat.topic}", groupId = "${kafka.chat.group-id}+19", containerFactory = "chatKafkaListenerContainerFactory")
    public void getMessage(Message message){
        log.info("리스너를 통해 전달중");
        messagingTemplate.convertAndSend("/subscribe/message/" + message.getRoomId(), message);
    }

    @KafkaListener(topics = "${kafka.box-arrive.topic}", groupId = "${kafka.chat.group-id}+10", containerFactory = "chatKafkaListenerContainerFactory")
    public void getArriveMessage(Message message){
        // 박스에서 오는 메세지는 결국 boxId, type만 올 것이다.
        Long roomId = Optional.ofNullable(chatRoomRepository.findByBoxIdAndStatus(message.getBoxId(), ChatRoomStatus.OPEN))
                        .map(ChatRoomEntity::getId)
                        .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST,"존재하지 않는 박스이거나 사용중이지 않는 박스입니다."));
        message.setRoomId(roomId);
        message.setContent("주문이 도착하였습니다.");
        log.info("message: {}", message);
        messagingTemplate.convertAndSend("/subscribe/message/" + roomId, message);

    }

}
