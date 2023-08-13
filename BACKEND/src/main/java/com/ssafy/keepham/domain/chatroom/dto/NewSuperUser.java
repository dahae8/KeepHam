package com.ssafy.keepham.domain.chatroom.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NewSuperUser {

    private Long roomId;
    private String newSuperUser;
}
