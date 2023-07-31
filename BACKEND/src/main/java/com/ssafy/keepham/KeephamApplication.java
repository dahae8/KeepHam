package com.ssafy.keepham;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class KeephamApplication {

    public static void main(String[] args) {
        SpringApplication.run(KeephamApplication.class, args);
    }

}
