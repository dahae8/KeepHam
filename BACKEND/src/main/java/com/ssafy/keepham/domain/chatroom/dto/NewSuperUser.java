package com.ssafy.keepham.domain.chatroom.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewSuperUser {

    private Long roomId;
    private String newSuperUser;
}
