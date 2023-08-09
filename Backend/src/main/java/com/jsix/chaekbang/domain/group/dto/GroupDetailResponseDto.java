package com.jsix.chaekbang.domain.group.dto;

import com.jsix.chaekbang.domain.group.domain.Group;
import com.querydsl.core.annotations.QueryProjection;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class GroupDetailResponseDto {

    private Long id;
    private String title;
    private String detail;
    private String question;
    private Long leaderId;
    private String imageUrl;
    private Boolean opened;
    private Integer userCount;
    private Integer readCount;
    private List<TagResponseDto> tags;
    private String leaderProfileImageUrl;
    private String leaderAboutMe;
    private String leaderNickname;


    public GroupDetailResponseDto(Group group, String leaderProfileImageUrl,
            String leaderAboutMe, String leaderNickname) {
        this.id = group.getId();
        this.title = group.getTitle();
        this.detail = group.getDetail();
        this.question = group.getQuestion();
        this.leaderId = group.getLeaderId();
        this.imageUrl = group.getImageUrl();
        this.opened = group.getOpened();
        this.userCount = group.getJoinedUserCount();
        this.readCount = group.getReadCount();
        this.tags = group.getGroupTags().stream()
                         .map(groupTag -> TagResponseDto.from(groupTag.getTag()))
                         .collect(Collectors.toList());
        this.leaderProfileImageUrl = leaderProfileImageUrl;
        this.leaderAboutMe = leaderAboutMe;
        this.leaderNickname = leaderNickname;
    }
}
