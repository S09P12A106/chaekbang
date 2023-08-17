package com.jsix.chaekbang.domain.group.application.repository;

import com.jsix.chaekbang.domain.group.domain.Tag;
import java.util.List;
import java.util.Optional;

public interface TagRepository {

    Tag save(Tag tag);

    List<Tag> saveAll(List<Tag> tags);

    List<Tag> findByTagNameIn(List<String> tagNames);

    Optional<Tag> findTopByOrderByTaggedCountDesc();
    
    List<Tag> findTop10ByOrderByTaggedCountDesc();

}
