package com.jsix.chaekbang.domain.group.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.application.repository.TagRepository;
import com.jsix.chaekbang.domain.group.dto.MostTaggedGroupsResponseDto;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class GroupSearchUseCaseTest {

    @Mock
    TagRepository tagRepository;
    @Mock
    GroupRepository groupRepository;

    @InjectMocks
    GroupSearchUseCase groupSearchUseCase;

    @DisplayName("추천 태그가 없으면 빈 배열을 반환한다.")
    @Test
    void 추천_태그_없음() {
        // given
        given(tagRepository.findTopByOrderByTaggedCountDesc()).willReturn(Optional.empty());

        // when
        MostTaggedGroupsResponseDto recommended = groupSearchUseCase.findRecommendedGroups();

        // then
        assertThat(recommended.getGroups()
                              .size()).isEqualTo(0);
    }


}