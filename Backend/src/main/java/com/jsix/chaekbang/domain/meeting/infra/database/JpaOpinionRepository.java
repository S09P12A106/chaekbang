package com.jsix.chaekbang.domain.meeting.infra.database;

import com.jsix.chaekbang.domain.meeting.domain.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaOpinionRepository extends JpaRepository<Opinion, Long> {

    Opinion save(Opinion opinion);
}
