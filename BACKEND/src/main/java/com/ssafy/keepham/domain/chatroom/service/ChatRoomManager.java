package com.ssafy.keepham.domain.chatroom.service;

import com.ssafy.keepham.common.error.ChatRoomError;
import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.chat.db.Message;
import com.ssafy.keepham.domain.chat.db.MessageRepository;
import com.ssafy.keepham.domain.chat.db.enums.Type;
import com.ssafy.keepham.domain.chatroom.entity.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.chatroom.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRoomManager {

    private final ChatRoomRepository chatRoomRepository;
    private final KafkaTemplate<String, Message> kafkaTemplate;
    private final MessageRepository messageRepository;
    private final RedisTemplate<String, String> redisTemplate;
    //TODO: Map에 저장하는 것이 아니라 redis에 저장한느 방식으로 변경

    public boolean isPasswordCorrect(Long roomId, String password){
        var room = chatRoomRepository.findFirstByIdAndStatus(roomId, ChatRoomStatus.OPEN);
        log.info("room password : {}", room.getPassword());
        log.info("입력받은 비밀번호 : {}", password);
        return room.getPassword().equals(password);
    }

    public boolean isSecretRoom(Long roomId){
        return chatRoomRepository.findFirstByIdAndStatus(roomId, ChatRoomStatus.OPEN).isLocked();
    }

    // 채팅방에 user 접속하면 해당 방 인원 1 증가
    public Set<String> userJoin(Long roomId, String userNickname){
        
        Long currentUserCount = getUserCountInChatRoom(roomId);
        int maxUserCount = getMaxUsersInChatRoom(roomId);
        
        if(currentUserCount >= maxUserCount){
            throw new ApiException(ChatRoomError.BAD_REQUEST);
        }
        
        redisTemplate.opsForSet().add(String.valueOf(roomId),userNickname);
        redisTemplate.expire(String.valueOf(roomId), 3600*3, TimeUnit.SECONDS);
        //        chatRoomUsers.computeIfAbsent(roomId, k -> new HashSet<>()).add(userNickname);

        currentUserCount = getUserCountInChatRoom(roomId);
        log.info("입장 후 현재 인원 {}", currentUserCount);
        log.info("치팅방 최대 {}", maxUserCount);
        log.info("입장 {}", redisTemplate.opsForSet().members(String.valueOf(roomId)));

        return redisTemplate.opsForSet().members(String.valueOf(roomId));

    }
    // 채팅방에서 user가 떠나면 해당 방 인원 감소
    public void userLeft(Long roomId, String userNickname){
        if (redisTemplate.opsForSet().isMember(String.valueOf(roomId),userNickname)){
            redisTemplate.opsForSet().remove(String.valueOf(roomId), userNickname);
        }

        Long currentUserCount = getUserCountInChatRoom(roomId);
        int maxUserCount = getMaxUsersInChatRoom(roomId);

        log.info("퇴장후 현재 인원 {}", currentUserCount);
        log.info("채팅방 최대 {}", maxUserCount);
        log.info("퇴장유저 {}", redisTemplate.opsForSet().members(String.valueOf(roomId)));
    }

    public boolean allUserClear(Long roomId){
        redisTemplate.delete(String.valueOf(roomId));
        return true;
    }

    public Set<String> getAllUser(Long roomID){
        return redisTemplate.opsForSet().members(String.valueOf(roomID));
    }

    // 채팅방 현재 접속자 수
    public Long getUserCountInChatRoom(Long roomId){
        return redisTemplate.opsForSet().size(String.valueOf(roomId));
    }

    // 채팅방 최대 인원
    public int getMaxUsersInChatRoom(Long roomId){
        var entity = chatRoomRepository.findFirstByIdAndStatus(roomId, ChatRoomStatus.OPEN);
        return Optional.ofNullable(entity)
                .map(ChatRoomEntity::getMaxPeopleNumber)
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST,"Invalid chat room ID or chat room is not open."));
    }


    public void sendMessageToRoom(@Payload Message message){
        message.setTimestamp(LocalDateTime.now());
        messageRepository.save(message);
        kafkaTemplate.send("kafka-chat", message);
    }

    public Set<String> pickRandomUsers(Set<String> users, int count){
        if (count >= users.size()){
            return new HashSet<>(users);
        }

        List<String> userList = new ArrayList<>(users);
        Set<String> result = new HashSet<>();

        Random random = new Random();
        while (result.size() < count){
            int randomIndex = random.nextInt(userList.size());
            result.add(userList.get(randomIndex));
        }
        return result;
    }
}