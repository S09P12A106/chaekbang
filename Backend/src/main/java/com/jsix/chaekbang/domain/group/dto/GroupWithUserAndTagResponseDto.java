package com.jsix.chaekbang.domain.group.dto;

import com.jsix.chaekbang.domain.group.domain.Group;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupWithUserAndTagResponseDto {

    private Long groupId;
    private String imageUrl;
    private String title;
    private Integer readCount;
    private Integer joinedUserCount;
    private List<TagResponseDto> tags;

    public static GroupWithUserAndTagResponseDto from(Group group) {
        return GroupWithUserAndTagResponseDto.builder()
                                             .groupId(group.getId())
                                             .imageUrl(group.getImageUrl())
                                             .title(group.getTitle())
                                             .readCount(group.getReadCount())
                                             .joinedUserCount(group.getJoinedUserCount())
                                             .tags(group.getGroupTags()
                                                        .stream()
                                                        .map(groupTag -> TagResponseDto.from(
                                                                groupTag.getTag()))
                                                        .toList())
                                             .build();
    }
}
