package com.ssafy.keepham.domain.chat.db;

import com.ssafy.keepham.domain.chat.db.enums.Type;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, Long> {
    List<Message> findAllByRoomIdAndTypeOrderByTimestampDesc(Long roomId, Type messageType);
    List<Message> findAllByRoomIdOrderByTimestampAsc(Long roomId);


}
