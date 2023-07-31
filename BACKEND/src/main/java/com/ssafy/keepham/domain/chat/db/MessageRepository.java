package com.ssafy.keepham.domain.chat.db;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, Long> {
    List<Message> findAllByRoomIdOrderByTimestampDesc(Long roomId);

}
