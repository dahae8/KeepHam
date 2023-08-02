package com.ssafy.keepham.domain.chatroom.dto;

import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.common.BaseEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

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
    private Long boxId;
    private int extensionNumber;
    private int maxPeopleNumber;
    private String superUserId;
    private boolean locked;


}
