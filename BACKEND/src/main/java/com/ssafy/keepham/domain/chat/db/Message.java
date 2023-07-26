package com.ssafy.keepham.domain.chat.db;

import jakarta.annotation.Nonnull;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {
    private String author;
    private String content;
    private String timestamp;

}
