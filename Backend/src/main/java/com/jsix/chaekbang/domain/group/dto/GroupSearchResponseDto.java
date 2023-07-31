package com.jsix.chaekbang.domain.group.dto;

import com.jsix.chaekbang.domain.group.domain.Group;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GroupSearchResponseDto {

    private Long groupId;
    private String title;
    private Integer readCount;
    private Integer joinedUserCount;
    private List<TagSearchResponseDto> tags;

    @Builder
    public GroupSearchResponseDto(Group group) {

        this.groupId = group.getId();
        this.title = group.getTitle();
        this.readCount = group.getReadCount();
        this.joinedUserCount = group.getJoinedUserCount();

        this.tags = group.getGroupTags()
                         .stream()
                         .map(groupTag -> TagSearchResponseDto.builder()
                                                              .tag(groupTag.getTag())
                                                              .build())
                         .collect(Collectors.toList());

    }
}