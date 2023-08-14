package com.ssafy.keepham.domain.chat.entity.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Type {

    ENTER("입장"),
    TALK("메세지"),
    EXIT("종료"),
    ARRIVE("주문 도착"),
    OPEN("상자 개방"),
    PASSWORD("키패드 암호"),
    INFO("공지사항"),
    KICK("강퇴");


    private final String description;

}
