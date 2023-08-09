package com.jsix.chaekbang.domain.meeting.application.repository;

import com.jsix.chaekbang.domain.meeting.domain.Meeting;

public interface MeetingRepository {

    Meeting save(Meeting meeting);
}
