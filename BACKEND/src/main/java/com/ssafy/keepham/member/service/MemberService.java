package com.ssafy.keepham.member.service;

import com.ssafy.keepham.member.dto.member.repose.MemberInfoRespose;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {
    private MemberInfoRespose memberInfoRespose;
    public MemberInfoRespose getMemberInfo(String userId){
        return memberInfoRespose.findById(userId)
                .map(MemberInfoRespose::from)
                .o
    }
}
