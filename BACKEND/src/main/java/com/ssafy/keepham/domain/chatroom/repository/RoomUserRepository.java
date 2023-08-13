package com.ssafy.keepham.domain.chatroom.repository;

import com.ssafy.keepham.domain.chatroom.entity.RoomUserEntity;
import com.ssafy.keepham.domain.chatroom.entity.enums.RoomUserStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomUserRepository extends MongoRepository<RoomUserEntity, Long> {

    Optional<RoomUserEntity> findFirstByRoomIdAndUserNickName(Long roomId, String nickName);
    List<RoomUserEntity> findAllByRoomIdAndStatus(Long roomId, RoomUserStatus status);


}
