package com.ssafy.keepham.domain.box.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoxService {
    private final BoxRepository boxRepository;

    @Autowired
    public BoxService (BoxRepository boxRepository){

        this.boxRepository = boxRepository;
    }

    //db에 박스 저장
    public Box saveBox(Box box){
        box.setStatus("정상");
        return boxRepository.save(box);
    }



}
