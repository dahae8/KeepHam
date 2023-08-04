package com.ssafy.keepham.domain.box.repository;

import com.ssafy.keepham.domain.box.entity.Box;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BoxRepository extends JpaRepository<Box,Long> {

    //삭제로 변환 안된 box들 조회
    List<Box> findByisValid(boolean isValid);

    Box findFirstById(Long boxId);

}
