package com.jsix.chaekbang.domain.group.dto;

import com.jsix.chaekbang.domain.group.domain.Group;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyGroupResponseDto {

    private long groupId;
    private String title;
    private String groupImageUrl;
    private List<TagResponseDto> tags;
    private int joinedUserCount;

    public static MyGroupResponseDto from(Group group) {
        return MyGroupResponseDto.builder()
                                 .groupId(group.getId())
                                 .title(group.getTitle())
                                 .groupImageUrl(group.getTitle())
                                 .tags(group.getGroupTags().stream()
                                            .map(TagResponseDto::fromGroupTag)
                                            .collect(Collectors.toList()))
                                 .joinedUserCount(group.getJoinedUserCount())
                                 .build();
    }
}
