package com.ssafy.keepham.security;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@RequiredArgsConstructor
@Component
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {
        try {
            String accessToken = parseBearerToken(request, HttpHeaders.AUTHORIZATION);
            User user = parseUserSpecification(accessToken);
            AbstractAuthenticationToken authenticated = UsernamePasswordAuthenticationToken.authenticated(user,accessToken,user.getAuthorities());
            log.info("authenticated : {}", authenticated);
            authenticated.setDetails(new WebAuthenticationDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticated);
            log.info("SecurityContextHolder: {}", SecurityContextHolder.getContext().getAuthentication());
            log.info("SecurityContextHolder: {}", SecurityContextHolder.getContext());
        }catch (ExpiredJwtException e){
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request,response);
    }

    private User parseUserSpecification(String token) {
        String split[] = Optional.ofNullable(token)
            .filter(subject -> 10 <= subject.length())
            .map(tokenProvider::validateTokenAndGetSubject)
            .orElse("123:123")
            .split(":");
        return new User(split[0],"", List.of(new SimpleGrantedAuthority(split[1])));
    }
    private void reissueAccessToken(HttpServletRequest request, HttpServletResponse response, Exception exception){
        try {
            String refreshToken = parseBearerToken(request,"Refresh-Token");
                    if(refreshToken == null){
                        throw exception;
                    }
            String oldAccessToken = parseBearerToken(request,HttpHeaders.AUTHORIZATION);
                    tokenProvider.validateRefreshToken(refreshToken,oldAccessToken);
                    String newAccessToken = tokenProvider.recreateAccessToken(oldAccessToken);
            User user = parseUserSpecification(newAccessToken);
            AbstractAuthenticationToken authenticated = UsernamePasswordAuthenticationToken.authenticated(user,newAccessToken,user.getAuthorities());
            authenticated.setDetails(new WebAuthenticationDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticated);

            response.setHeader("New-Access-Token", newAccessToken);
        }catch (ExpiredJwtException e){
            reissueAccessToken(request,response,e);
        }
        catch (Exception e) {
            request.setAttribute("exception", e);
        }

    }


    //토큰을 파싱 후 payload 부분만 남(접두사 제거)
    private String parseBearerToken(HttpServletRequest request, String headerName) {
        return Optional.ofNullable(request.getHeader(headerName))
                .filter(token -> token.substring(0, 7).equalsIgnoreCase("Bearer "))
                .map(token -> token.substring(7))
                .orElse(null);
    }
}
