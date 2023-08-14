package com.ssafy.keepham.config.redis;

import com.ssafy.keepham.domain.storePayment.entity.StorePayment;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.util.Set;

@Configuration
@PropertySource("classpath:redis.yaml")
@RequiredArgsConstructor
@EnableRedisRepositories
public class RedisConfig {

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory("i9c104.p.ssafy.io", 46379);
    }

    @Bean
    public RedisTemplate<String, Set<String>> redisTemplate() {
        RedisTemplate<String, Set<String>> redisTemplate = new RedisTemplate<>();
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new StringRedisSerializer());
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        return redisTemplate;
    }

    @Bean
    public RedisTemplate<String, StorePayment> storePaymentRedisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, StorePayment> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        // JSON 직렬화 설정
        Jackson2JsonRedisSerializer<StorePayment> jsonSerializer = new Jackson2JsonRedisSerializer<>(StorePayment.class);
        redisTemplate.setValueSerializer(jsonSerializer);
        redisTemplate.setHashValueSerializer(jsonSerializer);

        return redisTemplate;
    }

}