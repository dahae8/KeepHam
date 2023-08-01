package com.ssafy.keepham.domain.chatroom.dto;

import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomRequest {

    private String title;
    private Long storeId;
    private Long boxId;
    private String extensionNumber;
    private String type;
    private int maxPeopleNumber;
    private String superUserId;
    private boolean locked;


}
