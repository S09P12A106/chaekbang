package com.jsix.chaekbang.domain.meeting.infra.database;

import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaMeetingRepository extends JpaRepository<Meeting, Long> {
    Optional<Meeting> findById(Long id);

}
