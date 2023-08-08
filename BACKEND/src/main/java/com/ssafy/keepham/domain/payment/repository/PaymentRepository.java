package com.ssafy.keepham.domain.payment.repository;

import com.ssafy.keepham.domain.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment,Long> {
}
