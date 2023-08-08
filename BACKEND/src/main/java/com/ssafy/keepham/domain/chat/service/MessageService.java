package com.ssafy.keepham.domain.chat.service;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.chat.db.Message;
import com.ssafy.keepham.domain.chat.db.MessageRepository;
import com.ssafy.keepham.domain.chat.db.enums.Type;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public List<Message> findMessageLog(Long roomId){
        var messageList = messageRepository.findAllByRoomIdAndTypeOrderByTimestampDesc(roomId, Type.TALK);
        return Optional.ofNullable(messageList)
                .orElseThrow(()->new ApiException(ErrorCode.BAD_REQUEST, "채팅 로그가 존재하지 않습니다."));
    }

}
