package com.jsix.chaekbang.domain.meeting.infra.database;

import com.jsix.chaekbang.domain.meeting.application.repository.OpinionBoxRepository;
import com.jsix.chaekbang.domain.meeting.domain.OpinionBox;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OpinionBoxRepositoryImpl implements OpinionBoxRepository {

    private final JpaOpinionBoxRepository jpaOpinionBoxRepository;
    private final QueryMeetingRepository queryMeetingRepository;

    @Override
    public OpinionBox save(OpinionBox opinionBox) {
        return jpaOpinionBoxRepository.save(opinionBox);
    }

    @Override
    public Optional<OpinionBox> findById(Long id) {
        return jpaOpinionBoxRepository.findById(id);
    }

    @Override
    public List<OpinionBox> findByMeetingId(long meetingId) {
        return queryMeetingRepository.findByIdWithOpinionBox(meetingId);
    }
}
