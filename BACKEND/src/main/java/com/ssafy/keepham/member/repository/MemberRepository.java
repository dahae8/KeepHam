package com.ssafy.keepham.member.repository;

import com.ssafy.keepham.member.common.MemberType;

import java.lang.reflect.Member;
import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    Optional<Member> findByUserId(String userId);
    List<Member> findByAllType(MemberType memberType);
}
