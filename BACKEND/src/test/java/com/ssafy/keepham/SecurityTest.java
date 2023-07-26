package com.ssafy.keepham;

import com.ssafy.keepham.security.TokenProvider;
import com.ssafy.keepham.user.common.UserRole;
import com.ssafy.keepham.user.dto.signup.request.SignUpRequest;
import com.ssafy.keepham.user.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;


import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;


@SpringBootTest
public class SecurityTest {


//    @Test
//    public void testCreateToken() {
//        // Given
//        String userSpecification = "user123";
//        String secretKey = "yourSecretKey";
//        String issuer = "example.com";
//        int expirationHours = 1;
//
//        // When
//        String token = createToken(secretKey, issuer, expirationHours, userSpecification);
//
//        // Then
//        assertNotNull(token);
//        Claims claims = Jwts.parserBuilder()
//                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//
//        assertEquals(userSpecification, claims.getSubject());
//        assertEquals(issuer, claims.getIssuer());
//
//        LocalDateTime issuedAt = claims.getIssuedAt().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
//        assertTrue(issuedAt.isBefore(LocalDateTime.now().plusSeconds(1))); // IssuedAt should be within 1 second from now
//
//        LocalDateTime expectedExpiration = LocalDateTime.now().plus(expirationHours, ChronoUnit.HOURS);
//        LocalDateTime actualExpiration = claims.getExpiration().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
//        assertEquals(expectedExpiration, actualExpiration);
//    }
//
//    private String createToken(String secretKey, String issuer, int expirationHours, String userSpecification) {
//        return Jwts.builder()
//                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS512)
//                .setSubject(userSpecification)
//                .setIssuer(issuer)
//                .setIssuedAt(Timestamp.valueOf(LocalDateTime.now()))
//                .setExpiration(Date.from(Instant.now().plus(expirationHours, ChronoUnit.HOURS)))
//                .compact();
//    }
}
