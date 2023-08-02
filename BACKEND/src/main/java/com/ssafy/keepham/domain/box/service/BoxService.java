package com.ssafy.keepham.domain.box.service;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.box.convert.BoxConvert;
import com.ssafy.keepham.domain.box.dto.BoxDTO;
import com.ssafy.keepham.domain.box.dto.BoxRequest;
import com.ssafy.keepham.domain.box.dto.BoxResponse;
import com.ssafy.keepham.domain.box.entity.Box;
import com.ssafy.keepham.domain.box.repository.BoxRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoxService {
    private final BoxRepository boxRepository;
    private final BoxConvert boxConvert;

    //db에 박스 저장
    public BoxResponse saveBox(BoxRequest boxRequest){

        var entity =boxConvert.toEntity(boxRequest);

        return Optional.ofNullable(entity)
                .map(it -> {
                    //status, isValid의 default 값 넣어주기
                    entity.setValid(true);
                    entity.setStatus("정상");

                    boxRepository.save(entity);
                    return boxConvert.toResponse(entity);
                })
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST));
    }

    //특정 id 박스 조회
    public BoxResponse getBoxById(Long boxId){
        var entity = boxRepository.findById(boxId).orElse(null);
        return boxConvert.toResponse(entity);
    }

    //삭제로 변환 안된 box들 조회
    public List<BoxDTO> getAllBox(){
        //return boxRepository.findAll();
        return convertToListDTO(boxRepository.findByisValid(true));
    }

    //박스수정
    public Box updateBox(Box box){
        return boxRepository.save(box);
    }

    //박스 삭제 상태로 전환
    public Box deleteBox(Long boxId){
        Box box = boxRepository.findById(boxId).orElse(null);
        box.setValid(false);
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
