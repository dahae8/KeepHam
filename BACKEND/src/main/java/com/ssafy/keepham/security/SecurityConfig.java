package com.ssafy.keepham.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@EnableMethodSecurity
@RequiredArgsConstructor
@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationEntryPoint entryPoint;
    private final List<String> CORS_ALLOW_LIST = Arrays.asList("http://localhost:5173", "http://localhost:5001","http://localhost:3000", "https://i9c104.p.ssafy.io");
    private final List<String> CORS_ALLOW_METHOD = Arrays.asList("HEAD", "GET", "POST", "PUT", "OPTIONS");
    private final List<String> CORS_ALLOW_HEADER = Arrays.asList("Authorization", "Cache-Control", "Content-Type",
            "Access-Control-Allow-Headers", "Access-Control-Allow-Origin");

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        String ALLOW_URL[] = {"/,/**,/sign-up", "/sign-in","/swagger-ui/**", "/api/swagger-ui/**", "/api/**", "/v3/api-docs/**"};
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//                .formLogin().disable()
//                .httpBasic().disable()
            .csrf().disable()
//            .cors().disable()
            .headers(headers -> headers.frameOptions().sameOrigin())
            .authorizeHttpRequests(request -> request.requestMatchers(ALLOW_URL).permitAll()
                .anyRequest().authenticated())
            .sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtAuthenticationFilter, BasicAuthenticationFilter.class)
                .exceptionHandling(handler -> handler.authenticationEntryPoint(entryPoint))
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(CORS_ALLOW_LIST);
        configuration.setAllowedMethods(CORS_ALLOW_METHOD);
        configuration.setAllowedHeaders(CORS_ALLOW_HEADER);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
