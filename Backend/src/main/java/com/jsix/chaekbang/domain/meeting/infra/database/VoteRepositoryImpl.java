package com.jsix.chaekbang.domain.meeting.infra.database;

import com.jsix.chaekbang.domain.meeting.application.repository.VoteRepository;
import com.jsix.chaekbang.domain.meeting.domain.Vote;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VoteRepositoryImpl implements VoteRepository {

    private final JpaVoteRepository jpaVoteRepository;

    @Override
    public List<Vote> findAllByMeetingId(Long meetingId) {
        return jpaVoteRepository.findAllByMeetingId(meetingId);
    }

    @Override
    public void save(Vote vote) {
        jpaVoteRepository.save(vote);
    }

    @Override
    public void delete(Vote vote) {
        jpaVoteRepository.delete(vote);
    }

    @Override
    public Optional<Vote> findById(String id) {
        return jpaVoteRepository.findById(id);
    }
}
