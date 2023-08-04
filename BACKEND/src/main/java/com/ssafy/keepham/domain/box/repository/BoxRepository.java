package com.ssafy.keepham.domain.box.repository;

import com.ssafy.keepham.domain.box.entity.Box;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoxRepository extends JpaRepository<Box,Long> {

    //삭제로 변환 안된 box들 조회
    List<Box> findByisValid(boolean isValid);


    //우편번호 근처에 해당하는 삭제안된 박스 리스트 검색
    @Query(value = "SELECT *\n" +
            "FROM box\n" +
            "WHERE is_valid = true and zip_code IN (\n" +
            "    SELECT zip_code\n" +
            "    FROM jibun\n" +
            "    WHERE umd_nm in (SELECT umd_nm FROM jibun WHERE zip_code = ?1)\n" +
            ")",nativeQuery = true)
    List<Box> getAllzipcode(String zipcode);


}
