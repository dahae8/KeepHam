package com.ssafy.keepham.domain.chatroom.entity;

import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.chatroomuser.entity.ChatRoomUserEntity;
import com.ssafy.keepham.domain.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "chat_room")
@Getter
@Setter
@ToString(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Builder
public class ChatRoomEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Enumerated(value = EnumType.STRING)
    private ChatRoomStatus status;
    private Long storeId;
    private Long boxId;
    private String extensionNumber;
    private String type;
    private int maxPeopleNumber;
    private String superUserId;
    private boolean locked;
    @OneToMany(mappedBy = "chatRoom")
    private List<ChatRoomUserEntity> users = new ArrayList<>();


}
