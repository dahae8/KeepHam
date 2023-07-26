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

        public String validateTokenAndGetSubJect(String token){
                return Jwts.parserBuilder()
                    .setSigningKey(secretKey.getBytes())
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        }
}
