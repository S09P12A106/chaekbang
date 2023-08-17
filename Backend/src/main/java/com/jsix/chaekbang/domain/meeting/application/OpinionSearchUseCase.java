package com.jsix.chaekbang.domain.meeting.application;

import com.jsix.chaekbang.domain.meeting.application.repository.OpinionBoxRepository;
import com.jsix.chaekbang.domain.meeting.domain.MeetingUser;
import com.jsix.chaekbang.domain.meeting.domain.OpinionBox;
import com.jsix.chaekbang.domain.meeting.dto.OpinionSearchResponseDto;
import com.jsix.chaekbang.domain.meeting.infra.database.JpaMeetingUserRepository;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class OpinionSearchUseCase {

    private final OpinionBoxRepository opinionBoxRepository;
    private final JpaMeetingUserRepository jpaMeetingUserRepository;

    public List<OpinionSearchResponseDto> searchOpinion(AuthUser authUser, long meetingId) {
        List<OpinionBox> opinionBoxes = opinionBoxRepository.findByMeetingId(meetingId);
        return opinionBoxes.stream().map(opinionBox -> OpinionSearchResponseDto.createFromMeeting(
                opinionBox)).collect(Collectors.toList());
    }
}
