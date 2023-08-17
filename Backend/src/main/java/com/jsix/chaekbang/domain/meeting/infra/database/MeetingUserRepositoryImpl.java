package com.jsix.chaekbang.domain.meeting.infra.database;

import com.jsix.chaekbang.domain.meeting.application.repository.MeetingUserRepository;
import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.meeting.domain.MeetingUser;
import com.jsix.chaekbang.domain.user.domain.User;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MeetingUserRepositoryImpl implements MeetingUserRepository {

    private final JpaMeetingUserRepository jpaMeetingUserRepository;

    @Override
    public void save(MeetingUser user) {
        jpaMeetingUserRepository.save(user);
    }

    @Override
    public Optional<MeetingUser> findByMeetingAndUser(Meeting meeting, User user) {
        return jpaMeetingUserRepository.findByUserAndMeeting(user, meeting);
    }
}
