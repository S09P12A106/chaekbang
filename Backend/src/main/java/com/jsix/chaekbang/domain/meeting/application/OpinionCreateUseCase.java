package com.jsix.chaekbang.domain.meeting.application;

import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.UserStatus;
import com.jsix.chaekbang.domain.meeting.application.repository.OpinionBoxRepository;
import com.jsix.chaekbang.domain.meeting.application.repository.OpinionRepository;
import com.jsix.chaekbang.domain.meeting.domain.Opinion;
import com.jsix.chaekbang.domain.meeting.domain.OpinionBox;
import com.jsix.chaekbang.domain.meeting.dto.OpinionCreateRequestDto;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import com.jsix.chaekbang.global.exception.NotGroupUserException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class OpinionCreateUseCase {

    private final GroupRepository groupRepository;
    private final OpinionBoxRepository opinionBoxRepository;
    private final OpinionRepository opinionRepository;

    public void createOpinion(AuthUser authUser, long groupId, long meetingId, long opinionBoxId,
            OpinionCreateRequestDto opinionCreateRequestDto) {
        Group group = groupRepository.findByGroupIdAndUserStatus(groupId, UserStatus.ACTIVE);
        User writer = getOpinionWriter(group, authUser);
        OpinionBox opinionBox = opinionBoxRepository.findById(opinionBoxId)
                                                    .orElseThrow(
                                                            () -> new NotFoundResourceException(
                                                                    "그룹을 찾을 수 없습니다."));
        Opinion opinion = opinionCreateRequestDto.toOpinionEntity(opinionBox, writer);
        opinionRepository.save(opinion);
    }

    /**
     * 그룹의 참여자들(ACTIVE) 중 AuthUser와 일치하는 유저를 반환한다.
     *
     * @param group
     * @param authUser
     * @return AuthUser와 Group의 User가 일치하면 해당 User 반환
     */
    private User getOpinionWriter(Group group, AuthUser authUser) {
        return group.getGroupUsers()
                    .stream()
                    .filter((groupUser) -> groupUser.getUser()
                                                    .getId()
                                                    .equals(authUser.getUserId()))
                    .findAny()
                    .orElseThrow(() -> new NotGroupUserException("그룹 유저가 아닙니다."))
                    .getUser();
    }
}
