package com.ssafy.keepham.domain.box.dto;

import lombok.Data;

@Data
public class BoxDTO {
    private Long boxId;
    private String address;
    private String status;
    private String type;

    public BoxDTO() {
    }

    public BoxDTO(Long boxId, String address, String status, String type) {
        this.boxId = boxId;
        this.address = address;
        this.status = status;
        this.type = type;
    }

}
