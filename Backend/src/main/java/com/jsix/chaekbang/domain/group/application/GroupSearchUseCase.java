package com.jsix.chaekbang.domain.group.application;

import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.application.repository.TagRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.GroupUser;
import com.jsix.chaekbang.domain.group.domain.Tag;
import com.jsix.chaekbang.domain.group.domain.UserStatus;
import com.jsix.chaekbang.domain.group.dto.GroupDetailProjectionResponseDto;
import com.jsix.chaekbang.domain.group.dto.GroupDetailResponseDto;
import com.jsix.chaekbang.domain.group.dto.GroupParticipantResponseDto;
import com.jsix.chaekbang.domain.group.dto.GroupSearchRequestDto;
import com.jsix.chaekbang.domain.group.dto.GroupUserResponseDto;
import com.jsix.chaekbang.domain.group.dto.GroupUsersResponseDto;
import com.jsix.chaekbang.domain.group.dto.GroupWithUserAndTagResponseDto;
import com.jsix.chaekbang.domain.group.dto.MostTaggedGroupsResponseDto;
import com.jsix.chaekbang.domain.group.dto.UserGroupResponseDto;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GroupSearchUseCase {

    private final GroupRepository groupRepository;
    private final TagRepository tagRepository;

    @Transactional(readOnly = true)
    public List<GroupWithUserAndTagResponseDto> findPopularGroups() {
        List<Group> list = groupRepository.findMostReadCount();
        return list.stream()
                   .map(GroupWithUserAndTagResponseDto::from)
                   .toList();
    }

    @Transactional(readOnly = true)
    public MostTaggedGroupsResponseDto findRecommendedGroups() {
        Optional<Tag> mostTagged = tagRepository.findTopByOrderByTaggedCountDesc();

        if (mostTagged.isEmpty()) {
            return MostTaggedGroupsResponseDto.withNoTag();
        }

        Tag tag = mostTagged.get();
        List<Group> groups = groupRepository.findMostTaggedCountByTagName(tag.getTagName());
        return MostTaggedGroupsResponseDto.fromGroupsAndTag(groups, tag);
    }

    @Transactional(readOnly = true)
    public List<GroupWithUserAndTagResponseDto> searchGroupByKeywordAndTags(
            GroupSearchRequestDto groupSearchRequestDto) {

        Pageable pageable = PageRequest.of(groupSearchRequestDto.getPageNum(),
                groupSearchRequestDto.getPageSize());

        List<Group> searchedGroups = groupRepository.findByKeywordAndTags(
                groupSearchRequestDto.getKeyword(),
                groupSearchRequestDto.getTags(), pageable);

        return searchedGroups.stream()
                             .map(GroupWithUserAndTagResponseDto::from)
                             .collect(
                                     Collectors.toList());

    }

    @Transactional
    public GroupDetailResponseDto searchGroupDetail(long groupId) {
        GroupDetailProjectionResponseDto groupDetailByGroupId = groupRepository.findGroupDetailByGroupId(
                groupId);
        try {
            Group group = groupDetailByGroupId.getGroup();
            group.plusReadCount();

            return new GroupDetailResponseDto(group,
                    groupDetailByGroupId.getLeaderProfileImageUrl(),
                    groupDetailByGroupId.getLeaderAboutMe(),
                    groupDetailByGroupId.getLeaderNickname());
        } catch (NullPointerException e) {
            throw new NotFoundResourceException("그룹이 존재하지 않습니다.");
        }
    }

    @Transactional(readOnly = true)
    public GroupUsersResponseDto searchGroupUsers(long groupId) {
        Group group = groupRepository.findByGroupIdAndUserStatus(groupId, UserStatus.ACTIVE);
        if (group == null) {
            throw new NotFoundResourceException("그룹이 존재하지 않습니다.");
        }

        List<User> users = group.getGroupUsers().stream().map(GroupUser::getUser).toList();
        List<GroupUserResponseDto> groupUserResponseDtoList = users.stream()
                                                                   .map(GroupUserResponseDto::fromUser)
                                                                   .toList();
        return new GroupUsersResponseDto(group.getLeaderId(), groupUserResponseDtoList);
    }

    @Transactional(readOnly = true)
    public List<UserGroupResponseDto> searchMyActiveGroups(AuthUser authUser) {

        List<Group> groupList = groupRepository.findByUserIdAndUserStatus(authUser.getUserId(),
                UserStatus.ACTIVE);
        return groupList.stream().map(UserGroupResponseDto::from)
                        .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<UserGroupResponseDto> searchMyWaitingGroups(AuthUser authUser) {

        List<Group> groupList = groupRepository.findByUserIdAndUserStatus(authUser.getUserId(),
                UserStatus.WAITING);
        return groupList.stream().map(UserGroupResponseDto::from)
                        .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<UserGroupResponseDto> searchMyGroupHistory(AuthUser authUser) {

        List<Group> userList = groupRepository.findGroupHistoryByUserId(authUser.getUserId());
        return userList.stream().map(UserGroupResponseDto::from)
                       .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<GroupParticipantResponseDto> searchGroupParticipant(long groupId, AuthUser leader) {
        return groupRepository.findByIdAndLeaderWithAnswer(groupId, leader.getUserId());
    }

    @Transactional(readOnly = true)
    public List<UserGroupResponseDto> searchUserActiveGroups(long userId) {

        List<Group> groupList = groupRepository.findByUserIdAndUserStatus(userId,
                UserStatus.ACTIVE);
        return groupList.stream().map(UserGroupResponseDto::from)
                        .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<UserGroupResponseDto> searchUserGroupHistory(long userId) {

        List<Group> userList = groupRepository.findGroupHistoryByUserId(userId);
        return userList.stream().map(UserGroupResponseDto::from)
                       .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public GroupDetailResponseDto searchGroupDetailForUpdate(long groupId) {
        GroupDetailProjectionResponseDto groupDetailByGroupId = groupRepository.findGroupDetailByGroupId(
                groupId);
        try {
            Group group = groupDetailByGroupId.getGroup();

            return new GroupDetailResponseDto(group,
                    groupDetailByGroupId.getLeaderProfileImageUrl(),
                    groupDetailByGroupId.getLeaderAboutMe(),
                    groupDetailByGroupId.getLeaderNickname());
        } catch (NullPointerException e) {
            throw new NotFoundResourceException("그룹이 존재하지 않습니다.");
        }
    }

    @Transactional(readOnly = true)
    public boolean searchGroupUserStatus(long groupId, AuthUser authUser) {
        return groupRepository.existsByGroupIdAndUserId(groupId, authUser.getUserId());
    }

}
