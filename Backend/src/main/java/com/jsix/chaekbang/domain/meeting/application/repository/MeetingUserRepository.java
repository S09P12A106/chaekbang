package com.jsix.chaekbang.domain.meeting.application.repository;

import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.meeting.domain.MeetingUser;
import com.jsix.chaekbang.domain.user.domain.User;
import java.util.Optional;

public interface MeetingUserRepository {

    void save(MeetingUser user);
    Optional<MeetingUser> findByMeetingAndUser(Meeting meeting, User user);
}
