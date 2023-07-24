package com.jsix.chaekbang.domain.group.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class TagTest {

    @DisplayName("plusTaggedCount 메서드를 호출하면 태그카운트가 1 증가한다.")
    @Test
    void 태그_카운트_더하기_일(){
        // given
        int taggedCount = 1;
        Tag tag = Tag.createTag("TAG");
        ReflectionTestUtils.setField(tag, "taggedCount", taggedCount);

        // when
        tag.plusTaggedCount();

        // then
        assertThat(tag.getTaggedCount()).isEqualTo(taggedCount+1);
    }

}