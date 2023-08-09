package com.ssafy.keepham.domain.menu.repository;

import com.ssafy.keepham.domain.menu.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    @Query(value = "SELECT m FROM Menu m WHERE m.storeId = :storeId")
    List<Menu> findByStoreId(int storeId);
}
