package com.jsix.chaekbang.domain.group.dto;

import com.jsix.chaekbang.domain.group.domain.GroupTag;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GroupTagResponseDto {

    private Long tagId;
    private String tagName;

    public static GroupTagResponseDto from(GroupTag groupTag) {
        return GroupTagResponseDto.builder()
                                  .tagId(groupTag.getId())
                                  .tagName(groupTag.getTag().getTagName())
                                  .build();
    }

}
