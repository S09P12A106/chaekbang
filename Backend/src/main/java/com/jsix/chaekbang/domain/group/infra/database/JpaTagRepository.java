package com.jsix.chaekbang.domain.group.infra.database;

import com.jsix.chaekbang.domain.group.domain.Tag;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaTagRepository extends JpaRepository<Tag, Long> {

    List<Tag> findByTagNameIn(List<String> tagNames);

    Optional<Tag> findTopByOrderByTaggedCountDesc();
}
