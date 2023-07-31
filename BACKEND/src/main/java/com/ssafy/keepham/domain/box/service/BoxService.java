package com.ssafy.keepham.domain.box.service;

import com.ssafy.keepham.domain.box.dto.BoxDTO;
import com.ssafy.keepham.domain.box.entity.Box;
import com.ssafy.keepham.domain.box.repository.BoxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BoxService {
    private final BoxRepository boxRepository;

    @Autowired
    public BoxService (BoxRepository boxRepository){

        this.boxRepository = boxRepository;
    }

    //db에 박스 저장
    public Box saveBox(Box box){
        //status, isValid의 default 값 넣어주기
        box.setStatus("정상");
        box.setIsValid(false);
        return boxRepository.save(box);
    }

    //특정 id 박스 조회
    public BoxDTO getBoxById(Long boxId){

        return convertToDTO(boxRepository.findById(boxId).orElse(null));
    }

    //삭제로 변환 box들 조회
    public List<BoxDTO> getAllBox(){
        //return boxRepository.findAll();
        return convertToListDTO(boxRepository.findByisValid(false));
    }

    //박스수정
    public Box updateBox(Box box){
        return boxRepository.save(box);
    }

    //박스 삭제 상태로 전환
    public Box deleteBox(Long boxId){
        Box box = boxRepository.findById(boxId).orElse(null);
        box.setIsValid(true);
        return boxRepository.save(box);
    }

    private BoxDTO convertToDTO(Box box){
        BoxDTO dto = new BoxDTO();
        dto.setBoxId(box.getBoxId());
        dto.setAddress(box.getAddress());
        dto.setStatus(box.getStatus());
        dto.setType(box.getType());
        return dto;
    }

    private List<BoxDTO> convertToListDTO(List<Box> boxs){
        List<BoxDTO> dtos = new ArrayList<>();

        for (Box box : boxs){
            BoxDTO dto = convertToDTO(box);
            dtos.add(dto);
        }
        return dtos;

    }







}
