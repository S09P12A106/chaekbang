package com.jsix.chaekbang.domain.user.dto;


import com.jsix.chaekbang.domain.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoResponseDto {

    private Long userId;
    private String nickname;
    private String profileImageUrl;


    @Builder
    public UserInfoResponseDto(Long userId, String nickname, String profileImageUrl) {
        this.userId = userId;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }


    public static UserInfoResponseDto from(User user) {
        return UserInfoResponseDto.builder()
                                  .userId(user.getId())
                                  .nickname(user.getNickname())
                                  .profileImageUrl(user.getProfileImageUrl())
                                  .build();
    }
}
