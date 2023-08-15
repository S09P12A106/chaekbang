package com.jsix.chaekbang.domain.meeting.infra.database;

import com.jsix.chaekbang.domain.meeting.application.repository.OpinionBoxRepository;
import com.jsix.chaekbang.domain.meeting.domain.OpinionBox;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OpinionBoxRepositoryImpl implements OpinionBoxRepository {

    private final JpaOpinionBoxRepository jpaOpinionBoxRepository;

    @Override
    public OpinionBox save(OpinionBox opinionBox) {
        return jpaOpinionBoxRepository.save(opinionBox);
    }

    @Override
    public Optional<OpinionBox> findById(Long id) {
        return jpaOpinionBoxRepository.findById(id);
    }
}
