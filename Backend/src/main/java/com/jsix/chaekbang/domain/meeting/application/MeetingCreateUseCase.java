package com.jsix.chaekbang.domain.meeting.application;

import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.meeting.application.repository.MeetingRepository;
import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.meeting.domain.SessionIdValidator;
import com.jsix.chaekbang.domain.meeting.dto.MeetingCreateRequestDto;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.exception.MeetingCreationExceededException;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import com.jsix.chaekbang.global.exception.NotGroupLeaderException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MeetingCreateUseCase {

    private final MeetingRepository meetingRepository;
    private final GroupRepository groupRepository;
    private final SessionIdValidator sessionIdValidator;

    public void createMeeting(AuthUser authUser, long groupId,
            MeetingCreateRequestDto meetingCreateRequestDto) {

        Group group = groupRepository.findById(groupId)
                                     .orElseThrow(
                                             () -> new NotFoundResourceException("그룹을 찾을 수 없습니다."));
        if (!isLeaderOfGroup(authUser, group)) {
            throw new NotGroupLeaderException("그룹 리더만 미팅을 생성할 수 있습니다.");
        }

        Long groupCount = meetingRepository.findNotClosedMeetingCountByGroupId(groupId);
        if (groupCount >= 5) {
            throw new MeetingCreationExceededException("책방을 더이상 생성할 수 없습니다.");
        }

        Meeting createdMeeting = meetingCreateRequestDto.toMeetingEntity(group);
        meetingRepository.save(createdMeeting);
    }

    private boolean isLeaderOfGroup(AuthUser authUser, Group group) {
        return group.getLeaderId()
                    .equals(authUser.getUserId());
    }

    public String makeSessionId(Long meetingId) {
        // 저장된 meetingId 인지 검증
        meetingRepository.findById(meetingId).orElseThrow(
                () -> new NotFoundResourceException("미팅을 찾을 수 없습니다."));
        return sessionIdValidator.getSessionId(meetingId);

    }

}
