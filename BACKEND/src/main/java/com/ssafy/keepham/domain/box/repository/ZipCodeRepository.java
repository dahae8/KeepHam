package com.ssafy.keepham.domain.box.repository;

import com.ssafy.keepham.domain.box.entity.ZipCodeInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ZipCodeRepository extends JpaRepository<ZipCodeInfo,Long> {
}
