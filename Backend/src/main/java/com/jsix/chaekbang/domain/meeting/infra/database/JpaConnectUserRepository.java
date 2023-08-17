package com.jsix.chaekbang.domain.meeting.infra.database;

import com.jsix.chaekbang.domain.meeting.domain.ConnectUser;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface JpaConnectUserRepository extends CrudRepository<ConnectUser, String> {

    List<ConnectUser> findByMeetingId(Long meetingId);
}
