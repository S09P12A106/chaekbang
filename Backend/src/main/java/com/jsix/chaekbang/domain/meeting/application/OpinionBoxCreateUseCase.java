package com.jsix.chaekbang.domain.meeting.application;

import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.meeting.application.repository.MeetingRepository;
import com.jsix.chaekbang.domain.meeting.application.repository.OpinionBoxRepository;
import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.meeting.domain.OpinionBox;
import com.jsix.chaekbang.domain.meeting.dto.OpinionBoxCreateRequestDto;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import com.jsix.chaekbang.global.exception.NotGroupLeaderException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class OpinionBoxCreateUseCase {

    private final GroupRepository groupRepository;
    private final MeetingRepository meetingRepository;
    private final OpinionBoxRepository opinionBoxRepository;

    public long createOpinionBox(AuthUser authUser, long groupId, long meetingId,
            OpinionBoxCreateRequestDto opinionBoxCreateRequestDto) {
        Group group = groupRepository.findById(groupId)
                                     .orElseThrow(
                                             () -> new NotFoundResourceException("그룹을 찾을 수 없습니다."));
        validateGroupLeader(group, authUser);
        Meeting meeting = meetingRepository.findById(meetingId)
                                           .orElseThrow(() -> new NotFoundResourceException(
                                                   "미팅을 찾을 수 없습니다."));
        OpinionBox opinionBox = opinionBoxCreateRequestDto.toOpinionBoxEntity(meeting);
        opinionBoxRepository.save(opinionBox);
        return opinionBox.getId();
    }

    private void validateGroupLeader(Group group, AuthUser authUser) {
        if (!group.getLeaderId()
                  .equals(authUser.getUserId())) {
            throw new NotGroupLeaderException("그룹 리더만 의견함을 생성할 수 있습니다.");
        }
    }

}
