package com.jsix.chaekbang.domain.meeting.infra.database;

import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.meeting.domain.MeetingUser;
import com.jsix.chaekbang.domain.user.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaMeetingUserRepository extends JpaRepository<MeetingUser, Long> {

    Optional<MeetingUser> findByUserAndMeeting(User user, Meeting meeting);

    MeetingUser findByIdAndUser_Id(long meetingId, long userId);
}
