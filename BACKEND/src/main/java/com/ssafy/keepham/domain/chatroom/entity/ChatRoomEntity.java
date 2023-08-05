package com.ssafy.keepham.domain.chatroom.entity;

import com.ssafy.keepham.domain.box.entity.Box;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import com.ssafy.keepham.domain.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

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
    @Column(length = 255, nullable = false, unique = true)
    private String title;
    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private ChatRoomStatus status;
    @Column(nullable = false)
    private Long storeId;
    @OneToOne
    @JoinColumn(name = "box_id")
    private Box box;
    private Integer extensionNumber;
    private int maxPeopleNumber;
    private String superUserId;
    @Column(columnDefinition = "boolean default 0", nullable = false)
    private boolean locked;
    @Column(length = 255, nullable = false)
    private String password;

}
