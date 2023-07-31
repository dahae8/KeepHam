package com.ssafy.keepham.domain.chat.db;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "chatting")
@Builder
public class Message {

    @Id
    private String id;
    private Long roomId;
    private String author;
    private String content;
    private String timestamp;

}
