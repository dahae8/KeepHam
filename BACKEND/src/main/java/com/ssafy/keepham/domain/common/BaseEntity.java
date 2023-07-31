package com.ssafy.keepham.domain.common;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
@EntityListeners(value = AuditingEntityListener.class)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class BaseEntity {

    @CreatedDate
    @Column(columnDefinition = "datetime(6) default now(6) comment '생성시간'", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(columnDefinition = "datetime(6) default now(6) comment '수정시간'", nullable = false)
    private LocalDateTime updatedAt;
}
