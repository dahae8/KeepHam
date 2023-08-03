package com.ssafy.keepham.domain.address.service;

import com.ssafy.keepham.domain.address.entity.JibunInfo;
import com.ssafy.keepham.domain.address.repository.JibunInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JibunInfoService {
    private final JibunInfoRepository jibunInfoRepository;

    @Autowired
    public JibunInfoService (JibunInfoRepository jibunInfoRepository){
        this.jibunInfoRepository = jibunInfoRepository;
    }

    //전체 주소 조회
    public List<String> getAllJIbunInfo(){

        List<String> jibunList = new ArrayList<>();
        List<JibunInfo> jibunInfos = jibunInfoRepository.findAll();
        String division = " ";
        for (JibunInfo jibunInfo :jibunInfos ){
            String jibun = jibunInfo.getSdNm()+division+jibunInfo.getSggNm();

            String lawUmdNm = jibunInfo.getLawUmdNm();
            String lawRiNm = jibunInfo.getLawRiNm();

            if (lawUmdNm.length() != 0){
                jibun +=division +lawUmdNm;
            }
            if (lawRiNm.length() != 0){
                jibun +=division +lawRiNm;
            }

            jibunList.add(jibun);
        }
        return jibunList;
    }

}
