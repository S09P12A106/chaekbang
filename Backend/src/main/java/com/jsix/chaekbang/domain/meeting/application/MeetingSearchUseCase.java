package com.jsix.chaekbang.domain.meeting.application;


import com.jsix.chaekbang.domain.meeting.application.repository.MeetingRepository;
import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.meeting.dto.MeetingDetailResponseDto;
import com.jsix.chaekbang.domain.meeting.dto.MeetingSearchResponseDto;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
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

    public MeetingDetailResponseDto getDetail(Long meetingId) {
        Meeting meeting = meetingRepository.findByIdWithOpinoionAndUser(meetingId)
            .orElseThrow(() -> new NotFoundResourceException("해당 미팅을 찾을 수 없습니다."));
        System.out.println(meeting.getId());
        return MeetingDetailResponseDto.from(meeting);
    }
}
