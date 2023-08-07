package com.jsix.chaekbang.domain.user.application;


import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.domain.user.dto.UserInfoResponseDto;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserSearchUseCase {

    private final UserRepository userRepository;

    public UserInfoResponseDto searchUserInfo(Long userId) {
        User user = userRepository.findById(userId)
                                  .orElseThrow(
                                          () -> new NotFoundResourceException("해당 유저를 찾을 수 없습니다"));
        return UserInfoResponseDto.from(user);
    }
}
