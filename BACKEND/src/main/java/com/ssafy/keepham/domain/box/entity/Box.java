package com.ssafy.keepham.domain.box.entity;

import jakarta.persistence.*;
@Table(name = "box")
@Entity
public class Box {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boxId;
    //키값

    @Column(length = 255, nullable = false)
    private String address;
    //주소

    @Column(length = 255, nullable = false)
    private String status;
    //상태 => 정상, 고장, 수리중

    @Column(length = 255, nullable = false)
    private String type;
    //유형 => 공용, 개인

    @Column(nullable = false)
    private boolean isValid;
    //삭제된것인가 => true(삭제된 상태), false(삭제 되지 않은 상태)

    //기본 생성자
    public Box(){}

    // INSERT시 사용
    public Box(String address, String status, String type) {
        this.address = address;
        this.status = status;
        this.type = type;
    }

    public Box(long boxId, String address, String status, String type) {
        this.boxId = boxId;
        this.address = address;
        this.status = status;
        this.type = type;
    }

    public Box(long boxId, String address, String status, String type, boolean isValid) {
        this.boxId = boxId;
        this.address = address;
        this.status = status;
        this.type = type;
        this.isValid = isValid;
    }

    public long getBoxId() {
        return boxId;
    }

    public void setBoxId(long boxId) {
        this.boxId = boxId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean getIsValid() {
        return isValid;
    }

    public void setIsValid(boolean isValid) {
        this.isValid = isValid;
    }
}
