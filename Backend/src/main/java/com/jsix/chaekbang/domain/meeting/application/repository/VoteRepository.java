package com.jsix.chaekbang.domain.meeting.application.repository;


import com.jsix.chaekbang.domain.meeting.domain.Vote;
import java.util.List;
import java.util.Optional;

public interface VoteRepository {

    List<Vote> findAllByMeetingId(Long meetingId);

    void save(Vote vote);

    void delete(Vote vote);

    Optional<Vote> findById(String id);
}
