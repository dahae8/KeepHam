package com.ssafy.keepham.domain.chatroom.entity;

import com.ssafy.keepham.domain.chatroom.entity.enums.RoomUserStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chatroom")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomUserEntity{

    @Id
    private String id;
    private Long roomId;
    private String userNickName;
    @Enumerated(value = EnumType.STRING)
    private RoomUserStatus status;

}
