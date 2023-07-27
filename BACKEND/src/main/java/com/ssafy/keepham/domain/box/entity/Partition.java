package com.ssafy.keepham.domain.box.entity;

import jakarta.persistence.*;

@Table(name = "partitions")
@Entity
public class Partition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long partitionId;

    @Column(nullable = false)
    private long boxId;

    @Column(length = 255, nullable = false)
    private String state;

    public Partition() {}

    public Partition(long boxId, String state) {
        this.boxId = boxId;
        this.state = state;
    }

    public Partition(long partitionId, long boxId, String state) {
        this.partitionId = partitionId;
        this.boxId = boxId;
        this.state = state;
    }

    public long getPartitionId() {
        return partitionId;
    }

    public void setPartitionId(long partitionId) {
        this.partitionId = partitionId;
    }

    public long getBoxId() {
        return boxId;
    }

    public void setBoxId(long boxId) {
        this.boxId = boxId;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}

