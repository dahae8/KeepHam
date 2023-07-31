package com.ssafy.keepham.domain.chatroom.db;

import com.ssafy.keepham.domain.chatroom.db.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.common.BaseEntity;
import com.ssafy.keepham.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_room")
@Getter
@Setter
@ToString(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ChatRoomEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private ChatRoomStatus status;
    private Long storeId;
    private Long boxId;
    private String extensionNumber;
    private String type;
    private String maxPeopleNumber;
    private String superUserId;
    private boolean locked;


}
