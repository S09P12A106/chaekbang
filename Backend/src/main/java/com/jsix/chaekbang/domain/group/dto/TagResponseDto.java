package com.jsix.chaekbang.domain.group.dto;

import com.jsix.chaekbang.domain.group.domain.GroupTag;
import com.jsix.chaekbang.domain.group.domain.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagResponseDto {

    private Long tagId;
    private String tagName;

    public static TagResponseDto from(Tag tag) {
        return TagResponseDto.builder()
                             .tagId(tag.getId())
                             .tagName(tag.getTagName())
                             .build();
    }

    public static TagResponseDto fromGroupTag(GroupTag grouptag) {
        return TagResponseDto.builder()
                             .tagId(grouptag.getTag().getId())
                             .tagName(grouptag.getTag().getTagName())
                             .build();
    }
}
