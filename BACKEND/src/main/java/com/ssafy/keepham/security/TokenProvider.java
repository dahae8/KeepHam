package com.ssafy.keepham.security;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.keepham.domain.user.entity.UserRefreshToken;
import com.ssafy.keepham.domain.user.repository.UserRefreshTokenRepository;
import io.jsonwebtoken.*;

import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.TimeUnit;
import javax.crypto.spec.SecretKeySpec;

import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

/*
TODO: 회원의 리프레시 토큰을 관리할 엔티티
       로그인하면 리프레시 토큰을 발급한다.
       리프레시 토큰을 생성하는 메소드
       로그인 API 응답에 리프레시 토큰 추가
       리프레시 토큰을 통해 액세스 토큰을 갱신
       리프레시 토큰 검증 및 새로운 액세스 토큰 발급
       핸들러 구현
 */
@Service
@Getter
@Slf4j
@PropertySource("classpath:security.yaml")
public class TokenProvider {

        private final UserRefreshTokenRepository userRefreshTokenRepository;
        private final String secretKey;
        private final long expirationMinutes;
        private final long refreshExpirationHours;
        private final String issuer;
        private final long reissueLimit;
        private final ObjectMapper objectMapper = new ObjectMapper();
        private final RedisTemplate<String,String> redisTemplate;

        public TokenProvider(
                UserRefreshTokenRepository userRefreshTokenRepository,
                @Value("${secret-key}") String secretKey,
                @Value("${expiration-minutes}") long expirationMinutes,
                @Value("${refresh-expiration-hours}") long refreshExpirationHours,
                @Value("${issuer}") String issuer,
                RedisTemplate<String, String> redisTemplate){
                this.userRefreshTokenRepository = userRefreshTokenRepository;
                this.secretKey = secretKey;
                this.expirationMinutes = expirationMinutes;
                this.refreshExpirationHours = refreshExpirationHours;
                this.issuer = issuer;
                this.redisTemplate = redisTemplate;
                this.reissueLimit = refreshExpirationHours * 60 / expirationMinutes;
        }

        //accessToken
        public String createAccessToken(String userSpecification){
                return Jwts.builder()
                    .signWith(new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS512.getJcaName()))
                    .setSubject(userSpecification)
                    .setIssuer(issuer)
                    .setIssuedAt(Timestamp.valueOf(LocalDateTime.now()))
                    .setExpiration(Date.from(Instant.now().plus(expirationMinutes, ChronoUnit.HOURS)))
                    .compact();
        }

        public String validateTokenAndGetSubJect(String token){
                return validateAndparserToken(token)
                        .getBody()
                        .getSubject();
        }
        //왜 람다식 안되냐...
//        @Transactional
//        public String recreateAccessToken(String oldAccessToken) throws JsonProcessingException{
//                String subject = decodeJwtPayloadSubject(oldAccessToken);
//                userRefreshTokenRepository.findByUserIdAndReissueCountLessThan(UUID.fromString(subject.split(":")[0]),reissueLimit)
//                        .ifPresentOrElse(UserRefreshToken::increaseReissueCount,
//                                () -> {throw new ExpiredJwtException(null,null,"Refresh Token expire");
//                                }
//                        );
//                return createAccessToken(subject);
//        }
        @Transactional
        public String recreateAccessToken(String oldAccessToken) throws JsonProcessingException {
                String subject = decodeJwtPayloadSubject(oldAccessToken);
                Optional<UserRefreshTokenRepository> userRefreshTokenOptional = userRefreshTokenRepository.findByUserIdAndReissueCountLessThan(UUID.fromString(subject.split(":")[0]), reissueLimit);

                if (userRefreshTokenOptional.isPresent()) {
                        UserRefreshToken userRefreshToken = (UserRefreshToken) userRefreshTokenOptional.get();
                        userRefreshToken.increaseReissueCount();
                } else {
                        throw new ExpiredJwtException(null, null, "Refresh Token expire");
                }

                return createAccessToken(subject);
        }

        //Refresh Token 생성
        public String createRefreshToken(){
                Date now = new Date();
                long refreshExpirationMillis = refreshExpirationHours * 60 * 60 * 1000;
                Date expireDate = new Date(now.getTime() + refreshExpirationHours);
                String refreshToken = Jwts.builder()
                        .signWith(new SecretKeySpec(secretKey.getBytes(),SignatureAlgorithm.HS512.getJcaName()))
                        .setIssuer(issuer)
                        .setIssuedAt(Timestamp.valueOf(LocalDateTime.now()))
                        .setExpiration(Date.from(Instant.now().plus(refreshExpirationHours, ChronoUnit.HOURS)))
                        .compact();
                redisTemplate.opsForValue().set("test",refreshToken,refreshExpirationMillis, TimeUnit.MILLISECONDS);
                return refreshToken;
        }
        @Transactional
        public void validateRefreshToken(String refreshToken, String oldAccessToken) throws  JsonProcessingException{
                validateAndparserToken(refreshToken);
                String userId = decodeJwtPayloadSubject(oldAccessToken).split(":")[0];
                userRefreshTokenRepository.findByUserIdAndReissueCountLessThan(UUID.fromString(userId),reissueLimit)
                        .orElseThrow(() -> new ExpiredJwtException(null,null,"Refresh Token expire"));
        }
        private Jws<Claims> validateAndparserToken(String token){
                return Jwts.parserBuilder()
                        .setSigningKey(secretKey.getBytes())
                        .build()
                        .parseClaimsJws(token);
        }
        private String decodeJwtPayloadSubject(String oldAccessToken) throws JsonProcessingException {
                return objectMapper.readValue(
                        new String(Base64.getDecoder().decode(oldAccessToken.split("\\.")[1]), StandardCharsets.UTF_8),
                        Map.class
                ).get("sub").toString();
        }
}
