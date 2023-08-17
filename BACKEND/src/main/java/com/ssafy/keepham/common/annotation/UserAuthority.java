package com.ssafy.keepham.common.annotation;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/*
hasAuthority(authority) : 특정 권한(authority)을 가지고 있는지 확인합니다.
ElementType.METHOD: 메서드에 대한 어노테이션
*/

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("hasAuthority('USER')")
public @interface UserAuthority {
}
