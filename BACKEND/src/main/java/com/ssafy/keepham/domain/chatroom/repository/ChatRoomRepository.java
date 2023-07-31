package com.ssafy.keepham.domain.chatroom.repository;

import com.ssafy.keepham.domain.chatroom.db.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.db.enums.ChatRoomStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity, Long> {
    Page<ChatRoomEntity> findAllByStatusOrderByCreatedAtDesc(ChatRoomStatus status, Pageable pageable);

}
