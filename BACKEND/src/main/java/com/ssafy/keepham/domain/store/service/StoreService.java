package com.ssafy.keepham.domain.store.service;

import com.ssafy.keepham.domain.store.dto.store.response.StoreResponse;
import com.ssafy.keepham.domain.store.entity.Store;
import com.ssafy.keepham.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StoreService {
    private final StoreRepository storeRepository;
    public List<StoreResponse> getStores(String address, float lat, float lng){
        return storeRepository.findAllByStoreId(address,lat, lng).stream()
                .map(StoreResponse::from)
                .toList();
    }

}
