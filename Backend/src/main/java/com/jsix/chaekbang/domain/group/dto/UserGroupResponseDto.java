package com.jsix.chaekbang.domain.group.dto;

import com.jsix.chaekbang.domain.group.domain.Group;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserGroupResponseDto {

    private long groupId;
    private String title;
    private String imageUrl;
    private List<TagResponseDto> tags;
    private int joinedUserCount;
    private Integer readCount;

    public static UserGroupResponseDto from(Group group) {
        return UserGroupResponseDto.builder()
                                   .groupId(group.getId())
                                   .title(group.getTitle())
                                   .imageUrl(group.getImageUrl())
                                   .tags(group.getGroupTags().stream()
                                              .map(TagResponseDto::fromGroupTag)
                                              .collect(Collectors.toList()))
                                   .joinedUserCount(group.getJoinedUserCount())
                                   .readCount(group.getReadCount())
                                   .build();
    }
}
