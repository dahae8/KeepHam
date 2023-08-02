package com.ssafy.keepham.domain.chat.db;

import com.ssafy.keepham.domain.chat.db.enums.Type;
import jakarta.annotation.Nonnull;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;


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
    private LocalDateTime timestamp;
    @Enumerated(value = EnumType.STRING)
    private Type type;

}
