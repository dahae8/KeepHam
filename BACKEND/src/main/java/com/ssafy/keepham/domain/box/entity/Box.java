package com.ssafy.keepham.domain.box.entity;

import jakarta.persistence.*;
@Table(name = "box")
@Entity
public class Box {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boxId;

    @Column(length = 255, nullable = false)
    private String address;

    @Column(nullable = false)
    private int capacity;

    @Column(length = 255, nullable = false)
    private String status;
    //상태 => 정상, 고장, 수리중

    @Column(length = 255, nullable = false)
    private String type;
    //공용, 개인

    //기본 생성자
    public Box(){}

    // INSERT시 사용
    public Box(String address, int capacity, String status, String type) {
        this.address = address;
        this.capacity = capacity;
        this.status = status;
        this.type = type;
    }

    //SELECT시 사용
    public Box(long boxId, String address, int capacity, String status, String type) {
        this.boxId = boxId;
        this.address = address;
        this.capacity = capacity;
        this.status = status;
        this.type = type;
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

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
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
}
