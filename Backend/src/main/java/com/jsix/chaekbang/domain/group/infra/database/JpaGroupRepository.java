package com.jsix.chaekbang.domain.group.infra.database;

import com.jsix.chaekbang.domain.group.domain.Group;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JpaGroupRepository extends JpaRepository<Group, Long> {

    @Modifying
    @Query("update Group g set g.readCount = g.readCount + 1 where g.id = :groupId")
    int plusReadCount(@Param("groupId") long groupId);

    Optional<Group> findById(Long id);
}
