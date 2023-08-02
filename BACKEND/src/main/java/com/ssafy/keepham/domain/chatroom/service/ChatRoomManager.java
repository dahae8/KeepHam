package com.ssafy.keepham.domain.chatroom.service;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.chat.db.Message;
import com.ssafy.keepham.domain.chat.db.enums.Type;
import com.ssafy.keepham.domain.chatroom.entity.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.chatroom.repository.ChatRoomRepository;
import com.ssafy.keepham.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRoomManager {

    private final ChatRoomRepository chatRoomRepository;
    private final KafkaTemplate<String, Message> kafkaTemplate;
    private final Map<Long, Set<String>> chatRoomUsers = new ConcurrentHashMap<>();
    //TODO: Map에 저장하는 것이 아니라 redis에 저장한느 방식으로 변경

    public boolean isChatRoomFull(Long roomId){
        int currentUserCount = getUserCountInChatRoom(roomId);
        int maxUserCount = getMaxUsersInChatRoom(roomId);
        return currentUserCount >= maxUserCount;
    }

    // 채팅방에 user 접속하면 해당 방 인원 1 증가
    public void userJoin(Long roomId, String userNickname){
        int currentUserCount = getUserCountInChatRoom(roomId);
        int maxUserCount = getMaxUsersInChatRoom(roomId);

        if (currentUserCount >= maxUserCount) {
            log.info("풀방");
        }

        chatRoomUsers.computeIfAbsent(roomId, k -> new HashSet<>()).add(userNickname);

        log.info("입장 현재 {}", currentUserCount);
        log.info("입장 최대 {}", maxUserCount);
        log.info("입장 {}", chatRoomUsers.toString());
        Message entryMessage = Message.builder()
                .roomId(roomId)
                .author(userNickname)
                .content(userNickname + "님이 입장하셨습니다.")
                .type(Type.ENTER)
                .timestamp(LocalDateTime.now())
                .build();
        sendMessageToRoom(entryMessage, roomId);
    }
    // 채팅방에서 user가 떠나면 해당 방 인원 감소
    public void userLeft(Long roomId, String userNickname){
        Set<String> users = chatRoomUsers.get(roomId);
        if (users != null) {
            users.remove(userNickname);
        }
        int currentUserCount = getUserCountInChatRoom(roomId);
        int maxUserCount = getMaxUsersInChatRoom(roomId);

        log.info("퇴장 현재 {}", currentUserCount);
        log.info("퇴장 최대 {}", maxUserCount);
        log.info("퇴장 {}", chatRoomUsers.toString());

        Message exitMessage = Message.builder()
                .roomId(roomId)
                .author(userNickname)
                .content(userNickname + "님이 퇴장하셨습니다.")
                .type(Type.EXIT)
                .timestamp(LocalDateTime.now())
                .build();
        sendMessageToRoom(exitMessage, roomId);

    }

    // 채팅방 현재 접속자 수
    public int getUserCountInChatRoom(Long roomId){
        return chatRoomUsers.getOrDefault(roomId, new HashSet<>()).size();
    }

    // 채팅방 최대 인원
    public int getMaxUsersInChatRoom(Long roomId){
        var entity = chatRoomRepository.findFirstByIdAndStatus(roomId, ChatRoomStatus.OPEN);
        return Optional.ofNullable(entity)
                .map(ChatRoomEntity::getMaxPeopleNumber)
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST,"Invalid chat room ID or chat room is not open."));
    }


    public Message sendMessageToRoom(@Payload Message message, @DestinationVariable Long roomId){
        message.setTimestamp(LocalDateTime.now());
        kafkaTemplate.send("kafka-chat", message);
        return message;
    }
}
