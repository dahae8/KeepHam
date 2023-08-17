package com.ssafy.keepham.domain.chatroom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KickRequest {

    private String kickedUserNickName;
    private Long roomId;
}
