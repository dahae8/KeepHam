package com.ssafy.keepham.domain.chat.service;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.chat.converter.MessageConverter;
import com.ssafy.keepham.domain.chat.entity.MessageRepository;
import com.ssafy.keepham.domain.chat.entity.enums.Type;
import com.ssafy.keepham.domain.chat.dto.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final MessageConverter messageConverter;

    public List<MessageResponse> findMessageLog(Long roomId){
        List<Type> types = Arrays.asList(Type.TALK,Type.ARRIVE);
        var messageList = messageRepository.findAllByRoomIdAndTypeInOrderByTimestampAsc(roomId, types);
        Optional.ofNullable(messageList)
                .orElseThrow(()->new ApiException(ErrorCode.BAD_REQUEST, "채팅 로그가 존재하지 않습니다."));
        return messageList.stream().map(messageConverter::toResponse).toList();
    }

}
