package com.ssafy.keepham.domain.chatroom.dto;

import com.ssafy.keepham.domain.chatroom.db.enums.ChatRoomStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomRequest {

    private String title;
    private ChatRoomStatus status;
    private Long storeId;
    private Long boxId;
    private String extensionNumber;
    private String type;
    private String MaxPeopleNumber;
    private String superUserId;
    private boolean locked;


}
