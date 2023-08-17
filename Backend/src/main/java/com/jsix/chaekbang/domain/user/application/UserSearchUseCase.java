package com.jsix.chaekbang.domain.user.application;


import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.domain.user.dto.UserInfoResponseDto;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserSearchUseCase {

    private final UserRepository userRepository;

    public UserInfoResponseDto searchUserInfo(long userId) {
        User user = userRepository.findById(userId)
                                  .orElseThrow(
                                          () -> new NotFoundResourceException("해당 유저를 찾을 수 없습니다."));
        return UserInfoResponseDto.from(user);
    }

    public UserInfoResponseDto searchUserInfoByUserId(long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(
                        () -> new NotFoundResourceException("해당 유저를 찾을 수 없습니다."));
        return UserInfoResponseDto.from(user);
    }
}
