package com.ssafy.keepham.domain.chatroom.db;

import com.ssafy.keepham.domain.chatroom.db.enums.ChatRoomStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_room")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private ChatRoomStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime closedAt;

}
