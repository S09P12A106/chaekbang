package com.jsix.chaekbang.domain.group.dto;

import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.Tag;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MostTaggedGroupsResponseDto {

    private String tagName;
    private List<GroupWithUserAndTagResponseDto> groups;

    public static MostTaggedGroupsResponseDto fromGroupsAndTag(List<Group> groupList, Tag tag) {
        return MostTaggedGroupsResponseDto.builder()
                                          .tagName(tag.getTagName())
                                          .groups(groupList.stream()
                                                           .map(GroupWithUserAndTagResponseDto::from)
                                                           .toList())
                                          .build();
    }

    public static MostTaggedGroupsResponseDto withNoTag() {
        return MostTaggedGroupsResponseDto.builder()
                                          .tagName(null)
                                          .groups(new ArrayList<>())
                                          .build();
    }

}
