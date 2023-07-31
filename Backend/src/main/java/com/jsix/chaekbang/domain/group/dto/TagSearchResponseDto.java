package com.jsix.chaekbang.domain.group.dto;

import com.jsix.chaekbang.domain.group.domain.Tag;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TagSearchResponseDto {

    private Long tagId;
    private String tagName;

    @Builder
    public TagSearchResponseDto(Tag tag) {
        this.tagId = tag.getId();
        this.tagName = tag.getTagName();
    }

}
