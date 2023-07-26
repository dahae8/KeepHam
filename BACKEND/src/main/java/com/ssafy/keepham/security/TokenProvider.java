package com.ssafy.keepham.security;

import io.jsonwebtoken.SignatureAlgorithm;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import javax.crypto.spec.SecretKeySpec;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;

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
@PropertySource("classpath:security.yaml")
public class TokenProvider {
        @Value("${secret-key}")
        private String secretKey;
        @Value("${expiration-hours}")
        private long expirationHours;
        @Value("${refresh-expiration-hours}")
        private long refreshExpirationHours;
        @Value("${issuer}")
        private String issuer;

        public String createToken(String userSpecification){
                return Jwts.builder()
                    .signWith(new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS512.getJcaName()))
                    .setSubject(userSpecification)
                    .setIssuer(issuer)
                    .setIssuedAt(Timestamp.valueOf(LocalDateTime.now()))
                    .setExpiration(Date.from(Instant.now().plus(expirationHours, ChronoUnit.HOURS)))
                    .compact();
        }

        //
        public String createRefreshToken(){
                return Jwts.builder()
                        .signWith(new SecretKeySpec(secretKey.getBytes(),SignatureAlgorithm.HS512.getJcaName()))
                        .setIssuer(issuer)
                        .setIssuedAt(Timestamp.valueOf(LocalDateTime.now()))
                        .setExpiration(Date.from(Instant.now().plus(refreshExpirationHours, ChronoUnit.HOURS)))
                        .compact();
        }
        public String validateTokenAndGetSubJect(String token){
                return Jwts.parserBuilder()
                    .setSigningKey(secretKey.getBytes())
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        }
}
