package com.jsix.chaekbang.domain.group.dto;

import com.jsix.chaekbang.domain.user.domain.Gender;
import com.jsix.chaekbang.domain.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class GroupUserResponseDto {

    private Long id;
    private String nickname;
    private Gender gender;
    private String profileImageUrl;
    private String aboutMe;
    private int groupCount;


    public static GroupUserResponseDto from(User user) {
        return GroupUserResponseDto.builder()
                                   .id(user.getId())
                                   .nickname(user.getNickname())
                                   .gender(user.getGender())
                                   .profileImageUrl(user.getProfileImageUrl())
                                   .aboutMe(user.getAboutMe())
                                   .groupCount(user.getGroupCount())
                                   .build();
    }
}
