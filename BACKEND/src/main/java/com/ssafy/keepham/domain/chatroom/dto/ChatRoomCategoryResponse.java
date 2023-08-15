package com.ssafy.keepham.domain.chatroom.dto;

import com.ssafy.keepham.domain.common.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ChatRoomCategoryResponse extends ChatRoomResponse {

    private String category;
}
