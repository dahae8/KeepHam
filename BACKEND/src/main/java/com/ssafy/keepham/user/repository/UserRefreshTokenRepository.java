package com.ssafy.keepham.user.repository;

import com.ssafy.keepham.user.entity.UserRefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

public interface UserRefreshTokenRepository extends JpaRepository<UserRefreshToken, Long> {
    Optional<UserRefreshTokenRepository> findByUserIdAndReissueCountLessThan(UUID id, long count);
}
