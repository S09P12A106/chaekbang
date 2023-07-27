package com.jsix.chaekbang.domain.group.dto;

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
}
