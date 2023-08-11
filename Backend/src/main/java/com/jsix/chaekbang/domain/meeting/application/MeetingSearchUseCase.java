package com.jsix.chaekbang.domain.meeting.application;


import com.jsix.chaekbang.domain.meeting.application.repository.MeetingRepository;
import com.jsix.chaekbang.domain.meeting.dto.MeetingSearchResponseDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MeetingSearchUseCase {

    private final MeetingRepository meetingRepository;

    public List<MeetingSearchResponseDto> searchMeeting(long groupId, int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        return meetingRepository.findByGroupIdWithSlicing(
                groupId, pageable);
    }
}
