package com.ssafy.keepham.domain.storepayment.service;

import com.ssafy.keepham.domain.storepayment.repository.StorePaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StorePaymentService {
    private final StorePaymentRepository storePaymentRepository;


}
