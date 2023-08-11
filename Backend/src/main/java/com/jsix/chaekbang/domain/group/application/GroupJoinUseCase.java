package com.jsix.chaekbang.domain.group.application;


import com.jsix.chaekbang.domain.group.application.repository.GroupHistoryRepository;
import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.History;
import com.jsix.chaekbang.domain.group.domain.UserStatus;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GroupJoinUseCase {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final GroupHistoryRepository groupHistoryRepository;

    @Transactional
    public void joinGroup(Long groupId, AuthUser authUser, String answer) {
        User user = validateUser(authUser.getUserId());
        Group group = groupRepository.findById(groupId).orElseThrow(
                () -> new NotFoundResourceException("해당 그룹이 존재하지 않습니다."));

        group.joinGroup(user, answer);
    }

    @Transactional
    public void cancelJoinGroup(Long groupId, AuthUser authUser) {
        User user = validateUser(authUser.getUserId());
        Group group = validateGroupWithUserStatus(groupId, UserStatus.WAITING);

        group.cancelGroup(user);
    }

    @Transactional
    public void approveJoinGroup(Long groupId, AuthUser leader, long userId) {

        User user = validateUser(userId);
        Group group = groupRepository.findByGroupIdAndUserStatus(groupId, UserStatus.WAITING);

        group.approveGroup(user, leader.getUserId());
    }

    @Transactional
    public void disapproveJoinGroup(Long groupId, AuthUser leader, long userId) {

        User user = validateUser(userId);
        Group group = validateGroupWithUserStatus(groupId, UserStatus.WAITING);

        group.disapproveGroup(user, leader.getUserId());
    }

    @Transactional
    public void withdrawGroup(Long groupId, AuthUser leader, long userId) {

        User user = validateUser(userId);
        Group group = validateGroupWithUserStatus(groupId, UserStatus.ACTIVE);

        LocalDateTime participatedAt = group.withdrawGroup(user,
                leader.getUserId());
        createHistory(group, user, participatedAt);
    }

    @Transactional
    public void leaveGroup(Long groupId, AuthUser authUser) {
        User user = validateUser(authUser.getUserId());
        Group group = validateGroupWithUserStatus(groupId, UserStatus.ACTIVE);

        LocalDateTime participatedAt = group.leaveGroup(user);
        createHistory(group, user, participatedAt);
    }

    private void createHistory(Group group, User user, LocalDateTime participatedAt) {
        History history = History.createHistory(group, user, participatedAt,
                LocalDateTime.now());
        groupHistoryRepository.save(history);
    }

    private User validateUser(long userId) {
        return userRepository.findById(userId)
                             .orElseThrow(
                                     () -> new NotFoundResourceException("유저를 찾을 수 없습니다."));
    }

    private Group validateGroupWithUserStatus(long groupId, UserStatus userStatus) {
        Group group = groupRepository.findByGroupIdAndUserStatus(groupId, userStatus);
        if (group == null) {
            throw new NotFoundResourceException("해당 그룹을 찾을 수 없습니다.");
        }
        return group;
    }

}
