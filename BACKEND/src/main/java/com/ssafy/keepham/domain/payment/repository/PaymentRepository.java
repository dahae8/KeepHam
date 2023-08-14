package com.ssafy.keepham.domain.payment.repository;

import com.ssafy.keepham.domain.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment,Long> {

    //해당 닉네임의 가장 최신 total_point 가져오기
    @Query(value = "SELECT *\n" +
            "FROM payment\n" +
            "WHERE user_nick_name = ?1\n" +
            "ORDER BY time DESC\n" +
            "LIMIT 1;",nativeQuery = true)
    Payment getUserTotalPoint(String userNickName);

    @Query(value = "SELECT *\n" +
            "FROM payment\n" +
            "WHERE user_nick_name = ?1\n" +
            "ORDER BY time DESC",nativeQuery = true)
    List<Payment> getByUserNickName(String userNickName);

    Payment findByUserNickNameAndChatroomIdAndAgreement(String userNickName, Long roomId, boolean b);

    List<Payment> findAllByChatroomIdAndAgreement(Long roomId, boolean b);
}
