package com.ssafy.keepham.domain.chat.entity;

import com.ssafy.keepham.domain.chat.entity.enums.Type;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;


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
    private Long boxId;
    private String author;
    private String content;
    private LocalDateTime timestamp;
    @Enumerated(value = EnumType.STRING)
    private Type type;
    private Set<String> users;

}
