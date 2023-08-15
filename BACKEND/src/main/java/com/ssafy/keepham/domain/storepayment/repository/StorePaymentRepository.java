package com.ssafy.keepham.domain.storepayment.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.ssafy.keepham.domain.storepayment.entity.StorePayment;

import java.time.LocalDateTime;
import java.util.List;

public interface StorePaymentRepository extends MongoRepository<StorePayment, String> {


    StorePayment findFirstByUserNickName(String userNickName);

    void deleteByUserNickName(String userNickName);

    List<StorePayment> findByRoomId(Long roomId);

    List<StorePayment> findByUserNickName(String userNickName);

    List<StorePayment> findByDeletionTimeBefore(LocalDateTime currentDateTime);
}
