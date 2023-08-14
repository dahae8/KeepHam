package com.ssafy.keepham.domain.box.service;

import com.ssafy.keepham.domain.box.entity.Jibun;
import com.ssafy.keepham.domain.box.repository.JibunRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JibunService {
    private  final JibunRepository jibunRepository;

    //유요한 우편번호 확인하기 true=>유요하지 않음, false => 유요함
    public boolean checkoutZipCode (String zipCode){
        Jibun jibun = jibunRepository.findFirstByZipCode(zipCode);
        if(jibun==null )
            return true;
        else
            return false ;
    }
}
