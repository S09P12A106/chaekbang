package com.jsix.chaekbang.domain.meeting.infra.database;

import com.jsix.chaekbang.domain.meeting.domain.OpinionBox;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaOpinionBoxRepository extends JpaRepository<OpinionBox, Long> {

    Optional<OpinionBox> findById(Long id);
    List<OpinionBox> findByMeeting_Id(long meetingId);
}
