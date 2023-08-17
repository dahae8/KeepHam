package com.ssafy.keepham.domain.store.repository;

import com.ssafy.keepham.domain.store.entity.Store;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {
    @Query(value = "SELECT s FROM Store s WHERE " +
            "s.address LIKE CONCAT(:address, '%') AND " +
            "ACOS(SIN(RADIANS(:lat)) * SIN(RADIANS(s.lat)) + " +
            "COS(RADIANS(:lat)) * COS(RADIANS(s.lat)) * COS(RADIANS(:lng - s.lng))) * 6371000 <= 1500")
    List<Store> findAllByAddressAndLocation(@Param("address") String address, @Param("lat") float lat, @Param("lng") float lng);

    Store findFirstByStoreId(Long storeId);

}
