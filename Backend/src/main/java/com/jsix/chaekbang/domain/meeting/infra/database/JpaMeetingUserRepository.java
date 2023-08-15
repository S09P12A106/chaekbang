package com.jsix.chaekbang.domain.meeting.infra.database;

import com.jsix.chaekbang.domain.meeting.domain.MeetingUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaMeetingUserRepository extends JpaRepository<MeetingUser, Long> {
    MeetingUser findByIdAndUser_Id(long meetingId, long userId);
}
