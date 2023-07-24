package com.ssafy.keepham.member.dto.member.repose;

import com.ssafy.keepham.member.common.MemberType;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Objects;


public final class MemberInfoRespose {
    @Schema(description = "회원키", example = "c0a80121-7aeb-4b4b-8b0a-6b1c032f0e4a")
    private final Long id;
    private final String loginId;
    private final String password;
    private final String name;
    private final MemberType memberType;


}


