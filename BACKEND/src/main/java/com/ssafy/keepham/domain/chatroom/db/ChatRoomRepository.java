package com.ssafy.keepham.domain.chatroom.db;

import com.ssafy.keepham.domain.chatroom.db.enums.ChatRoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity, Long> {

    List<ChatRoomEntity> findAllByStatusOrderByCreatedAtDesc(ChatRoomStatus status);


}
