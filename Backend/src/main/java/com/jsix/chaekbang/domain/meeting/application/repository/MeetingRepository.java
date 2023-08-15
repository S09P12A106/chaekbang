package com.jsix.chaekbang.domain.meeting.application.repository;

import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.meeting.dto.MeetingSearchResponseDto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;

public interface MeetingRepository {

    Meeting save(Meeting meeting);

    Optional<Meeting> findById(Long id);

    List<MeetingSearchResponseDto> findByGroupIdWithSlicing(long groupId, Pageable pageable);
    
    Long findNotClosedMeetingCountByGroupId(long groupId);
}
