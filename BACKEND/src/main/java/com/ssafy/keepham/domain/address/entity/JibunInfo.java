package com.ssafy.keepham.domain.address.entity;

import jakarta.persistence.*;

@Table(name = "jibun_info")
@Entity
public class JibunInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    //키값

    @Column(length = 50, nullable = false)
    private String sdNm;
    //시도명

    @Column(length = 50, nullable = false)
    private String sggNm;
    //시군구명

    @Column(length = 50)
    private String lawUmdNm;
    //법정읍면동명

    @Column(length = 50)
    private String lawRiNm;
    //법정리명


    public JibunInfo() {
    }

    public JibunInfo(long id, String sdNm, String sggNm, String lawUmdNm, String lawRiNm) {
        this.id = id;
        this.sdNm = sdNm;
        this.sggNm = sggNm;
        this.lawUmdNm = lawUmdNm;
        this.lawRiNm = lawRiNm;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSdNm() {
        return sdNm;
    }

    public void setSdNm(String sdNm) {
        this.sdNm = sdNm;
    }

    public String getSggNm() {
        return sggNm;
    }

    public void setSggNm(String sggNm) {
        this.sggNm = sggNm;
    }

    public String getLawUmdNm() {
        return lawUmdNm;
    }

    public void setLawUmdNm(String lawUmdNm) {
        this.lawUmdNm = lawUmdNm;
    }

    public String getLawRiNm() {
        return lawRiNm;
    }

    public void setLawRiNm(String lawRiNm) {
        this.lawRiNm = lawRiNm;
    }
}
