package com.ssafy.keepham.domain.box.convert;

import com.ssafy.keepham.common.error.ErrorCode;
import com.ssafy.keepham.common.exception.ApiException;
import com.ssafy.keepham.domain.box.dto.BoxRequest;
import com.ssafy.keepham.domain.box.dto.BoxResponse;
import com.ssafy.keepham.domain.box.entity.Box;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class BoxConvert {

    public Box toEntity(BoxRequest boxRequest){
        return Optional.ofNullable(boxRequest)
                .map(it -> {
                    return Box.builder()
                            .address(boxRequest.getAddress())
                            .status(boxRequest.getStatus())
                            .type(boxRequest.getType())
                            .isValid(boxRequest.isValid())
                            .build();
                }).orElseThrow(()->new ApiException(ErrorCode.NULL_POINT));
    }

    public BoxResponse toResponse(Box box){
        return Optional.ofNullable(box)
                .map(it -> {
                    return BoxResponse.builder()
                            .boxId(box.getId())
                            .address(box.getAddress())
                            .status(box.getStatus())
                            .type(box.getType())
                            .isValid(box.isValid())
                            .build();
                }).orElseThrow(()->new ApiException(ErrorCode.NULL_POINT));
    }
}
