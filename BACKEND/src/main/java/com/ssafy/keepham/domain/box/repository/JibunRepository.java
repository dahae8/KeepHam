package com.ssafy.keepham.domain.box.repository;

import com.ssafy.keepham.domain.box.entity.Jibun;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JibunRepository extends JpaRepository<Jibun,Long> {
    Jibun findFirstByZipCode(String zipCode);

}
