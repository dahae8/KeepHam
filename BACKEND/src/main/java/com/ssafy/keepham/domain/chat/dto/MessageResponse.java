package com.ssafy.keepham.domain.chat.dto;

import com.ssafy.keepham.domain.chat.db.enums.Type;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {

    private String id;
    private Long roomId;
    private Long boxId;
    private String author;
    private String content;
    private LocalTime timestamp;
    @Enumerated(value = EnumType.STRING)
    private Type type;
}
