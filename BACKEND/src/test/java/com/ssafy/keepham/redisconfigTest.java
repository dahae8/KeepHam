//package com.ssafy.keepham;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.context.annotation.PropertySource;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//@SpringBootTest
//@PropertySource("classpath:redis.yaml")
//public class redisconfigTest {
//
//        @Value("${spring.redis.host}")
//        private String redisHost;
//
//        @Value("${spring.redis.port}")
//        private int redisPort;
//
//        @Test
//        public void testRedisHostAndPort() {
//            // 주입된 값이 예상한 값과 일치하는지 확인
//            assertEquals("127.0.0.1", redisHost);
//            assertEquals(6379, redisPort);
//        }
//    }
//
