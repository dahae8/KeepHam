package com.ssafy.keepham.domain.admin.service;

import com.ssafy.keepham.domain.user.common.UserRole;
import com.ssafy.keepham.domain.user.dto.user.response.UserInfoResponse;
import com.ssafy.keepham.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AdminService {
    private final UserRepository userRepository;
    @Transactional
    public List<UserInfoResponse> getUsers(){
        return userRepository.findAllByUserRole(UserRole.USER).stream()
                .map(UserInfoResponse::toDto)
                .toList();
    }
    @Transactional
    public  List<UserInfoResponse> getAdmins(){
        return userRepository.findAllByUserRole(UserRole.ADMIN).stream()
                .map(UserInfoResponse::toDto)
                .toList();
    }
}
