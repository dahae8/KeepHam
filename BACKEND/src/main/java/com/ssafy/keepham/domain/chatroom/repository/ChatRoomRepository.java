package com.ssafy.keepham.domain.chatroom.repository;

import com.ssafy.keepham.domain.box.entity.Box;
import com.ssafy.keepham.domain.chatroom.entity.ChatRoomEntity;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity, Long> {
    Page<ChatRoomEntity> findAllByStatusOrderByCreatedAtDesc(ChatRoomStatus status, Pageable pageable);
    Page<ChatRoomEntity> findAllByStatusAndBoxOrderByCreatedAtDesc(ChatRoomStatus status, Box box, Pageable pageable);

    //박스리스트를 받아 연결된 방 페이저블로 반환
    @Query(value = "SELECT cr.* FROM chat_room cr " +
            "INNER JOIN box b ON cr.box_id = b.id " +
            "WHERE cr.status = :status AND b.id IN :boxIds " +
            "ORDER BY cr.created_at DESC",
            countQuery = "SELECT COUNT(*) FROM chat_room cr " +
                    "INNER JOIN box b ON cr.box_id = b.id " +
                    "WHERE cr.status = :status AND b.id IN :boxIds",
            nativeQuery = true)
    Page<ChatRoomEntity> findAllByStatusAndBoxIdsOrderByCreatedAtDesc(
            @Param("status") String status,
            @Param("boxIds") List<Long> boxIds,
            Pageable pageable);

    ChatRoomEntity findFirstByStatusAndBox(ChatRoomStatus status, Box box);
    ChatRoomEntity findFirstByIdAndStatus(Long id, ChatRoomStatus status);
    ChatRoomEntity findByBoxIdAndStatus(Long boxId, ChatRoomStatus status);

}
