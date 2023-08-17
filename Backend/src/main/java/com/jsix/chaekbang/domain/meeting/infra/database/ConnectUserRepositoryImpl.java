package com.jsix.chaekbang.domain.meeting.infra.database;

import com.jsix.chaekbang.domain.meeting.application.repository.ConnectUserRepository;
import com.jsix.chaekbang.domain.meeting.domain.ConnectUser;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConnectUserRepositoryImpl implements ConnectUserRepository {

    private final JpaConnectUserRepository jpaConnectUserRepository;

    @Override
    public void save(ConnectUser connectUser) {
        jpaConnectUserRepository.save(connectUser);
    }

    @Override
    public List<ConnectUser> findAllByMeetingId(Long meetingId) {
        return jpaConnectUserRepository.findByMeetingId(meetingId);
    }

    @Override
    public void delete(ConnectUser connectUser) {
        jpaConnectUserRepository.delete(connectUser);
    }

    @Override
    public Optional<ConnectUser> findBySessionId(String sessionId) {
        return jpaConnectUserRepository.findById(sessionId);
    }
}
