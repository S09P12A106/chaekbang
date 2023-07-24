package com.jsix.chaekbang.domain.group.application.repository;

import com.jsix.chaekbang.domain.group.domain.Tag;
import java.util.List;

public interface TagRepository {

    Tag save(Tag tag);

    List<Tag> saveAll(List<Tag> tags);

    List<Tag> findByTagNameIn(List<String> tagNames);
}
