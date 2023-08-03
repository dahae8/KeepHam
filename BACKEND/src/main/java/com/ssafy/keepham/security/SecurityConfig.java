package com.ssafy.keepham.security;


import java.net.URL;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@EnableMethodSecurity
@RequiredArgsConstructor
@Configuration
public class SecurityConfig {
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private AuthenticationEntryPoint entryPoint;
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        String ALLOW_URL[] = {"/,/**,/sign-up", "/sign-in","/swagger-ui/**"};
        return http
//                .formLogin().disable()
//                .httpBasic().disable()
            .csrf().disable()
            .cors().disable()
////            .headers(headers -> headers.frameOptions().sameOrigin())
            .authorizeHttpRequests(request -> request.requestMatchers(ALLOW_URL).permitAll()
                .anyRequest().authenticated())
            .sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS))
//            .addFilterBefore(jwtAuthenticationFilter, BasicAuthenticationFilter.class)
//                .exceptionHandling(handler -> handler.authenticationEntryPoint(entryPoint))
                .build();
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
