package com.ssafy.keepham.domain.chatroom.dto;

import com.ssafy.keepham.domain.box.entity.Box;
import com.ssafy.keepham.domain.chatroom.entity.enums.ChatRoomStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomRequest {

    @NotBlank
    private String title;
    private Long storeId;
    private Long boxId;
    private Integer extensionNumber;
    @Min(1)
    @Max(12)
    private int maxPeopleNumber;
    private String superUserId;
    private boolean locked;
    private String password;

}
