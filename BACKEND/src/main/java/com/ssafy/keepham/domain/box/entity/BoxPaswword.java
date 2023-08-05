package com.ssafy.keepham.domain.box.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "box_paswword")
@Entity
public class BoxPaswword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    //키값

    @Column(nullable = false)
    private long boxId;
    //함id

    @Column(length = 12, nullable = false)
    private String boxPassword;
    //함비밀번호

    @Column(nullable = false)
    private boolean isValid;
    //삭제된것인가 => true(삭제 되지 않은상태), false(삭제된 상태)

}
