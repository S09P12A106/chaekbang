package com.jsix.chaekbang.domain.meeting.application.repository;

import com.jsix.chaekbang.domain.meeting.domain.OpinionBox;
import java.util.List;
import java.util.Optional;

public interface OpinionBoxRepository {

    OpinionBox save(OpinionBox opinionBox);

    Optional<OpinionBox> findById(Long id);

    List<OpinionBox> findByMeetingId(long meetingId);
}
