package com.ssafy.keepham.domain.chatroom.dto;

import com.ssafy.keepham.domain.box.dto.BoxResponse;
import com.ssafy.keepham.domain.box.entity.Box;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.common.BaseEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ChatRoomResponse extends BaseEntity{

    private Long id;
    private String title;
    private ChatRoomStatus status;
    private Long storeId;
    private BoxResponse box;
    private int extensionNumber;
    private int maxPeopleNumber;
    private Long currentPeopleNumber;
    private String superUserId;
    private boolean locked;
    private LocalDateTime closedAt;



}
