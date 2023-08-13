package com.ssafy.keepham.domain.chatroom.entity.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum RoomUserStatus {

    NORMAL("정상"),
    KICKED("추방당한 유저"),
    EXIT("퇴장");

    private final String description;
}
