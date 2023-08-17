package com.jsix.chaekbang.domain.group.dto;

import com.jsix.chaekbang.domain.user.domain.Gender;
import com.jsix.chaekbang.domain.user.domain.User;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GroupUserResponseDto {

    private Long id;
    private String nickname;
    private Gender gender;
    private String profileImageUrl;
    private String aboutMe;
    private int groupCount;
    private String email;

    public static GroupUserResponseDto fromUser(User user) {
        return GroupUserResponseDto.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .gender(user.getGender())
                .profileImageUrl(user.getProfileImageUrl())
                .aboutMe(user.getAboutMe())
                .groupCount(user.getGroupCount())
                .email(user.getEmail())
                .build();
    }

}
