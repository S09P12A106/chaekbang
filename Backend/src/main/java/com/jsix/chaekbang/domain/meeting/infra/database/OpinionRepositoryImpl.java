package com.jsix.chaekbang.domain.meeting.infra.database;

import com.jsix.chaekbang.domain.meeting.application.repository.OpinionRepository;
import com.jsix.chaekbang.domain.meeting.domain.Opinion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OpinionRepositoryImpl implements OpinionRepository {

    private final JpaOpinionRepository jpaOpinionRepository;

    @Override
    public Opinion save(Opinion opinion) {
        return jpaOpinionRepository.save(opinion);
    }
}