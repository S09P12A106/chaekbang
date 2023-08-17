package com.jsix.chaekbang.domain.group.dto;

import com.jsix.chaekbang.domain.group.domain.Group;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class GroupDetailProjectionResponseDto {
    private Group group;
    private String leaderProfileImageUrl;
    private String leaderAboutMe;
    private String leaderNickname;

    @QueryProjection
    public GroupDetailProjectionResponseDto(Group group, String leaderProfileImageUrl,
            String leaderAboutMe, String leaderNickname) {
        this.group = group;
        this.leaderProfileImageUrl = leaderProfileImageUrl;
        this.leaderAboutMe = leaderAboutMe;
        this.leaderNickname = leaderNickname;
    }
}
