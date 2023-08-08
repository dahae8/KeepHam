package com.ssafy.keepham.domain.chat.db.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Type {

    ENTER("입장"),
    TALK("메세지"),
    EXIT("종료"),
    ARRIVE("주문 도착"),
    OPEN("상자 개방");


    private final String description;

}
