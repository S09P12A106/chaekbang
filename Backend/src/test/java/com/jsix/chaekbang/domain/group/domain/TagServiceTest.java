package com.jsix.chaekbang.domain.group.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.jsix.chaekbang.domain.group.domain.service.TagService;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
class TagServiceTest {

    @InjectMocks
    TagService tagService;

    @DisplayName("존재하는 태그이름들만 요청에 들어오면 태그들을 그대로 리턴한다.")
    @Test
    void 존재하는_태그면_생성_안함() {
        // given
        List<String> existedTagName = List.of("TAG1", "TAG2");
        List<String> totalTagNames = new ArrayList<>(existedTagName);

        List<Tag> existedTags = new ArrayList<>();
        Tag tag1 = Tag.createTag(existedTagName.get(0));
        Tag tag2 = Tag.createTag(existedTagName.get(1));
        ReflectionTestUtils.setField(tag1, "taggedCount", 1);
        ReflectionTestUtils.setField(tag2, "taggedCount", 1);
        existedTags.add(tag1);
        existedTags.add(tag2);

        // when
        List<Tag> allTags = tagService.getAllTagsRequired(existedTags, totalTagNames);

        // then : 참조값이 같은지 확인
        assertThat(allTags.get(0)).isEqualTo(tag1);
        assertThat(allTags.get(1)).isEqualTo(tag2);
    }

    @DisplayName("존재하지 않는 태그가 요청에 들어오면 해당 태그는 생성해서 반환한다.")
    @Test
    void 존재하지_않는_태그면_생성함() {
        // given
        List<String> existedTagName = List.of("TAG1", "TAG2", "TAG3");
        List<String> notExistedTagName = List.of("TAG4", "TAG5");
        List<String> totalTagNames = new ArrayList<>(existedTagName);
        totalTagNames.addAll(notExistedTagName);

        List<Tag> existedTags = new ArrayList<>();
        for (int idx = 1; idx <= existedTagName.size(); idx++) {
            Tag createdTag = Tag.createTag(existedTagName.get(idx - 1));
            ReflectionTestUtils.setField(createdTag, "taggedCount", 1);
            existedTags.add(createdTag);
        }
        // when
        List<Tag> allTags = tagService.getAllTagsRequired(existedTags, totalTagNames);

        // then
        assertThat(allTags).hasSize(5)
                           .extracting("tagName")
                           .containsAnyOf(
                                   notExistedTagName.get(0),
                                   notExistedTagName.get(1)
                           );
    }

    @DisplayName("존재하는 태그가 요청에 들어오면 해당 태그는 태그수가 1 증가한다.")
    @Test
    void 존재하는_태그면_태그수가_1증가함() {
        // given
        List<Tag> existedTags = new ArrayList<>();
        List<String> totalTagNames = new ArrayList<>();
        int initialTaggedCount = 1;
        Tag createdTag = Tag.createTag("TAG1");
        ReflectionTestUtils.setField(createdTag, "taggedCount", initialTaggedCount);
        existedTags.add(createdTag);
        totalTagNames.add("TAG1");

        // when
        List<Tag> allTags = tagService.getAllTagsRequired(existedTags, totalTagNames);

        // then
        assertThat(createdTag).extracting("taggedCount")
                              .isEqualTo(initialTaggedCount + 1);
    }

}