package com.jsix.chaekbang.domain.meeting.infra.database;

import com.jsix.chaekbang.domain.meeting.application.repository.MeetingRepository;
import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.meeting.dto.MeetingSearchResponseDto;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MeetingRepositoryImpl implements MeetingRepository {

    private final JpaMeetingRepository jpaMeetingRepository;
    private final QueryMeetingRepository queryMeetingRepository;

    @Override
    public Meeting save(Meeting meeting) {
        return jpaMeetingRepository.save(meeting);
    }

    @Override
    public Optional<Meeting> findById(Long id) {
        return jpaMeetingRepository.findById(id);
    }

    @Override
    public List<MeetingSearchResponseDto> findByGroupIdWithSlicing(long groupId,
            Pageable pageable) {
        return queryMeetingRepository.findByGroupIdWithSlicing(groupId, pageable);
    }

    @Override
    public Long findNotClosedMeetingCountByGroupId(long groupId) {
        return queryMeetingRepository.findNotClosedMeetingCountByGroupId(groupId);
    }

    @Override
    public Meeting findMeetingById(Long id) {
        return queryMeetingRepository.findMeetingById(id);
    }

}
