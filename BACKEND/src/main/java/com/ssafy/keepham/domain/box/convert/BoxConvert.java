package com.ssafy.keepham.domain.box.convert;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.box.dto.BoxRequest;
import com.ssafy.keepham.domain.box.dto.BoxResponse;
import com.ssafy.keepham.domain.box.dto.BoxSaveRequest;
import com.ssafy.keepham.domain.box.entity.Box;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class BoxConvert {

    public Box toSaveEntity(BoxSaveRequest boxSaveRequest){
        return Optional.ofNullable(boxSaveRequest)
                .map(it -> {
                    return Box.builder()
                            .status("정상")
                            .type(boxSaveRequest.getType())
                            .isValid(true)
                            .address(boxSaveRequest.getAddress())
                            .detailedAddress((boxSaveRequest.getDetailedAddress()))
                            .zipCode(boxSaveRequest.getZipCode())
                            .isUsed(false)
                            .latitude(boxSaveRequest.getLatitude())
                            .hardness(boxSaveRequest.getHardness())
                            .build();
                }).orElseThrow(()->new ApiException(ErrorCode.NULL_POINT));
    }

    public Box toEntity(BoxRequest boxRequest){
        return Optional.ofNullable(boxRequest)
                .map(it -> {
                    return Box.builder()
                            .status(boxRequest.getStatus())
                            .type(boxRequest.getType())
                            .isValid(boxRequest.isValid())
                            .address(boxRequest.getAddress())
                            .detailedAddress((boxRequest.getDetailedAddress()))
                            .zipCode(boxRequest.getZipCode())
                            .isUsed(boxRequest.isUsed())
                            .latitude(boxRequest.getLatitude())
                            .hardness(boxRequest.getHardness())
                            .build();
                }).orElseThrow(()->new ApiException(ErrorCode.NULL_POINT));
    }

    public BoxResponse toResponse(Box box){
        return Optional.ofNullable(box)
                .map(it -> {
                    return BoxResponse.builder()
                            .boxId(box.getId())
                            .status(box.getStatus())
                            .type(box.getType())
                            .isValid(box.isValid())
                            .address(box.getAddress())
                            .detailedAddress((box.getDetailedAddress()))
                            .zipCode(box.getZipCode())
                            .isUsed(box.isUsed())
                            .latitude(box.getLatitude())
                            .hardness(box.getHardness())
                            .build();
                }).orElseThrow(()->new ApiException(ErrorCode.NULL_POINT));
    }
}
