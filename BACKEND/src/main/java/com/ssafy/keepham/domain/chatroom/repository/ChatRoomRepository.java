package com.ssafy.keepham.domain.chatroom.repository;

import com.ssafy.keepham.domain.chatroom.entity.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity, Long> {
    Page<ChatRoomEntity> findAllByStatusOrderByCreatedAtDesc(ChatRoomStatus status, Pageable pageable);
    ChatRoomEntity findFirstByIdAndStatus(Long id, ChatRoomStatus status);
}
