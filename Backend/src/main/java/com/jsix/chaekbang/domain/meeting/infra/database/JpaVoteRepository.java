package com.jsix.chaekbang.domain.meeting.infra.database;

import com.jsix.chaekbang.domain.meeting.domain.Vote;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface JpaVoteRepository extends CrudRepository<Vote, String> {

    List<Vote> findAllByMeetingId(Long meetingId);
}
