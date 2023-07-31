package com.jsix.chaekbang.domain.group.application;

import com.jsix.chaekbang.domain.group.application.repository.TagRepository;
import com.jsix.chaekbang.domain.group.dto.TagResponseDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TagSearchUseCase {

    private final TagRepository tagRepository;

    @Transactional(readOnly = true)
    public List<TagResponseDto> searchPopularTag() {
        return tagRepository.findTop10ByOrderByTaggedCountDesc()
                            .stream()
                            .map(TagResponseDto::from)
                            .collect(Collectors.toList());
    }
}
