package com.ssafy.keepham.domain.box.controller;

import com.ssafy.keepham.common.annotation.AdminAuthority;
import com.ssafy.keepham.common.api.Api;
import com.ssafy.keepham.common.error.BoxError;
import com.ssafy.keepham.domain.box.dto.BoxRequest;
import com.ssafy.keepham.domain.box.dto.BoxResponse;
import com.ssafy.keepham.domain.box.dto.BoxSaveRequest;
import com.ssafy.keepham.domain.box.service.BoxService;
import com.ssafy.keepham.domain.box.service.JibunService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@AdminAuthority
@CrossOrigin(originPatterns = "*")
@RequestMapping("/api/admin/boxs")
public class SuperBoxController {
    private final BoxService boxService;
    private final JibunService jibunService;

    // 함생성
    @Operation(summary = "함생성")

    @PostMapping
    public Api<Object> createBox(@RequestBody BoxSaveRequest boxSaveRequest){
        String boxType  = boxSaveRequest.getType();
        String zipCode  = boxSaveRequest.getType();

        if( !boxType.equals("공용") && !boxType.equals("개인")){
            return Api.ERROR(BoxError.BOX_BAD_REQUEST, String.format("type의 [%s]은/는 요휴하지 않는 형식입니다. '공용' 또는 '개인'중에 지정해 보내주세요.", boxType));
        }
        else if(boxSaveRequest.getAddress().length()==0){
            return Api.ERROR(BoxError.BOX_BAD_REQUEST, String.format("address[도로명/지번 주소]룰 작성해주새요"));
        }
        else if(boxSaveRequest.getDetailedAddress().length()==0){
            return Api.ERROR(BoxError.BOX_BAD_REQUEST, String.format("detailedAddress[상세주소]룰 작성해주새요"));
        }
        else if(jibunService.checkoutZipCode(zipCode)){
            return Api.ERROR(BoxError.BOX_BAD_REQUEST, String.format("올바른 zipCode[우편번호]룰 작성해주새요"));
        }


        var res =  boxService.saveBox(boxSaveRequest);
        return Api.OK(res);
    }

    //특정 id의 함 조회
    @Operation(summary = "특정 id의 함 조회")
    @GetMapping("/{boxId}")
    public Api<Object> getBox(@PathVariable Long boxId){

        if(boxId<=0){
            return Api.ERROR(BoxError.BOX_BAD_REQUEST, String.format("[%d]은/는 요휴하지 않는 id형식 입니다. 1이상의 숫자로 요청해 주세요.", boxId));
        }

        var res = boxService.getBoxById(boxId);

        if(res.isValid()){
            return Api.OK(res);
        }
        else {
            return Api.ERROR(BoxError.BOX_NOT_FOUND, String.format("[%d]은/는 삭제된 함의 id 입니다.", boxId));
        }

    }

    //삭제로 변환 안된 함들 조회
    @Operation(summary = "삭제 안된 함들 전체 조회")
    @GetMapping
    public Api<List<BoxResponse>> getAllBox(){
        return  Api.OK(boxService.getAllBox());
    }

    //함 수정
    @Operation(summary = "함 수정")
    @PutMapping("/{boxId}")
    public  Api<Object> updateBox(@PathVariable Long boxId, @RequestBody BoxRequest boxRequest) {
        String boxType  = boxRequest.getType();
        String boxStatus  = boxRequest.getStatus();
        String zipCode = boxRequest.getZipCode();

        if (boxId <= 0) {
            return Api.ERROR(BoxError.BOX_BAD_REQUEST, String.format("[%d]은/는 요휴하지 않는 id형식 입니다. 1이상의 숫자로 요청해 주세요.", boxId));
        }
        else if( !boxType.equals("공용") && !boxType.equals("개인")){
            return Api.ERROR(BoxError.BOX_BAD_REQUEST, String.format("[%s]은/는 요휴하지 않는 type형식입니다. '공용' 또는 '개인'중에 지정해 보내주세요.", boxType));
        }
        else if( !boxStatus.equals("정상") && !boxStatus.equals("고장")&& !boxStatus.equals("수리중")){
            return Api.ERROR(BoxError.BOX_BAD_REQUEST, String.format("[%s]은/는 요휴하지 않는 status형식입니다. '정상' 또는 '고장' 또는 '수리중'중에 지정해 보내주세요.", boxStatus));
        }
        else if(boxRequest.getAddress().length()==0){
            return Api.ERROR(BoxError.BOX_BAD_REQUEST, String.format("address[도로명/지번 주소]룰 작성해주새요"));
        }
        else if(boxRequest.getDetailedAddress().length()==0){
            return Api.ERROR(BoxError.BOX_BAD_REQUEST, String.format("detailedAddress[상세주소]룰 작성해주새요"));
        }
        else if(jibunService.checkoutZipCode(zipCode)){
            return Api.ERROR(BoxError.BOX_BAD_REQUEST, String.format("올바른 zipCode[우편번호]룰 작성해주새요"));
        }

        var res = boxService.updateBox(boxId, boxRequest);
        return Api.OK(res);

    }
    //함 삭제 상태로 전환
    @Operation(summary = "함 삭제")
    @PutMapping("/delete/{boxId}")
    public Api<Object> deleteBox(@PathVariable Long boxId){

        if(boxId<=0){
            return Api.ERROR(BoxError.BOX_BAD_REQUEST, String.format("[%d]은/는 요휴하지 않는 id형식 입니다. 1이상의 숫자로 요청해 주세요.", boxId));
        }

        var res = boxService.deleteBox(boxId);

        return Api.OK(res);

    }


    // 우편번호에 해당하는 공용 박스 더미데이터 10개씩 생성
    @Operation(summary = "테스트용!!!! 우편번호에 해당하는 공용 박스 더미데이터 10개씩 생성")
    @PostMapping("/{zipCode}")
    public Api<Object> createTestBox(@PathVariable String zipCode){
        BoxSaveRequest boxSaveRequest = new BoxSaveRequest();
        boxSaveRequest.setType("공용");
        boxSaveRequest.setAddress("도로명/지번주소");
        boxSaveRequest.setDetailedAddress("상세주소");
        boxSaveRequest.setZipCode(zipCode);
        boxSaveRequest.setLatitude(0);
        boxSaveRequest.setHardness(0);

        for (int i = 0; i<10;i++){
            boxService.saveBox(boxSaveRequest);
        }
        return Api.OK(boxService.getAddressAllBox(zipCode));
    }



}
