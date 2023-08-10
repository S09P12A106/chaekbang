package com.jsix.chaekbang.domain.group.dto;

import com.jsix.chaekbang.domain.user.domain.Gender;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GroupParticipantResponseDto {

    private Long id;
    private String nickname;
    private Gender gender;
    private String profileImageUrl;
    private String aboutMe;
    private int groupCount;
    private String email;
    private String answer;

    @QueryProjection
    public GroupParticipantResponseDto(Long id, String nickname, Gender gender,
            String profileImageUrl,
            String aboutMe, int groupCount, String email, String answer) {
        this.id = id;
        this.nickname = nickname;
        this.gender = gender;
        this.profileImageUrl = profileImageUrl;
        this.aboutMe = aboutMe;
        this.groupCount = groupCount;
        this.email = email;
        this.answer = answer;
    }
}
