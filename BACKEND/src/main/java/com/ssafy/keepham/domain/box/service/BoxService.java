package com.ssafy.keepham.domain.box.service;

import com.ssafy.keepham.common.error.BoxError;
import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.box.convert.BoxConvert;
import com.ssafy.keepham.domain.box.dto.BoxRequest;
import com.ssafy.keepham.domain.box.dto.BoxResponse;
import com.ssafy.keepham.domain.box.dto.BoxSaveRequest;
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
    public BoxResponse saveBox(BoxSaveRequest boxSaveRequest){

        var entity =boxConvert.toSaveEntity(boxSaveRequest);

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
        var entity = boxRepository.findById(boxId)
                .orElseThrow(() -> new ApiException(BoxError.BOX_NOT_FOUND, String.format("[%d]은/는 존재하지 않는 함의 id입니다.", boxId)));
        return boxConvert.toResponse(entity);
    }

    //삭제로 변환 안된 box들 조회
        public List<BoxResponse> getAllBox(){
            List<BoxResponse> resList = new ArrayList<>();
            List<Box> boxs = boxRepository.findByisValid(true);

            for (Box box: boxs){
                BoxResponse res = boxConvert.toResponse(box);
                resList.add(res);
            }

        return resList;
    }

    //박스수정
    public BoxResponse updateBox(Long boxId, BoxRequest boxRequest){
        //유요한 id 확인
       boxRepository.findById(boxId)
                .orElseThrow(() -> new ApiException(BoxError.BOX_NOT_FOUND, String.format("[%d]은/는 존재하지 않는 함의 id입니다.", boxId)));

        Box box =boxConvert.toEntity(boxRequest);
        box.setId(boxId);
        box.setValid(true);
        var res = boxConvert.toResponse(boxRepository.save(box));
        return res;
    }

    //박스 삭제 상태로 전환
    public BoxResponse deleteBox(Long boxId){
        Box box = boxRepository.findById(boxId)
                .orElseThrow(() -> new ApiException(BoxError.BOX_NOT_FOUND, String.format("[%d]은/는 존재하지 않는 함의 id입니다.", boxId)));
        box.setValid(false);
        boxRepository.save(box);
        BoxResponse res = boxConvert.toResponse(box);
        return res;
    }

    //우편번호 근처에 해당하는 삭제안된 박스 리스트 검색
    public List<BoxResponse> getAddressAllBox(String zipCode){

        List<BoxResponse> resList = new ArrayList<>();
        List<Box> boxs = boxRepository.getAllzipcode(zipCode);


        for (Box box: boxs){
            BoxResponse res = boxConvert.toResponse(box);
            resList.add(res);
        }

        return resList;
    }

    //사용하지 않은 함들 조회
    public List<BoxResponse> getUnusedAllBox(){
        List<BoxResponse> resList = new ArrayList<>();
        List<Box> boxs = boxRepository.findByisUsed(false);

        for (Box box: boxs){
            BoxResponse res = boxConvert.toResponse(box);
            resList.add(res);
        }

        return resList;

    }

}
