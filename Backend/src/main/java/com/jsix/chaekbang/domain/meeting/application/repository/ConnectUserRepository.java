package com.jsix.chaekbang.domain.meeting.application.repository;

import com.jsix.chaekbang.domain.meeting.domain.ConnectUser;
import java.util.List;
import java.util.Optional;

public interface ConnectUserRepository {

    void save(ConnectUser connectUser);

    List<ConnectUser> findAllByMeetingId(Long meetingId);

    void delete(ConnectUser connectUser);

    Optional<ConnectUser> findBySessionId(String sessionId);
}
