package com.ssafy.keepham.user.repository;

import com.ssafy.keepham.user.entity.User;
import com.ssafy.keepham.user.entity.UserRefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRefreshTokenRepository extends JpaRepository<UserRefreshToken, Long> {
    Optional<UserRefreshTokenRepository> findByUserIdAndReissueCountLessThan(User user, long count);
}
