package com.jsix.chaekbang.domain.group.application;

import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.application.repository.TagRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.Tag;
import com.jsix.chaekbang.domain.group.domain.UserStatus;
import com.jsix.chaekbang.domain.group.dto.GroupDetailProjectionResponseDto;
import com.jsix.chaekbang.domain.group.dto.GroupDetailResponseDto;
import com.jsix.chaekbang.domain.group.dto.GroupSearchRequestDto;
import com.jsix.chaekbang.domain.group.dto.GroupUserResponseDto;
import com.jsix.chaekbang.domain.group.dto.GroupWithUserAndTagResponseDto;
import com.jsix.chaekbang.domain.group.dto.MostTaggedGroupsResponseDto;
import com.jsix.chaekbang.domain.group.dto.MyGroupResponseDto;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
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

        List<Group> searchedGroups = groupRepository.findByKeywordAndTags(
                groupSearchRequestDto.getKeyword(),
                groupSearchRequestDto.getTags());

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
    public List<GroupUserResponseDto> searchGroupUsers(long groupId) {
        Group group = validateGroup(groupId);
        List<User> userList = group.getGroupUsersByUserStatus(null, UserStatus.ACTIVE);
        return userList.stream().map(GroupUserResponseDto::from)
                       .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MyGroupResponseDto> searchMyActiveGroups(AuthUser authUser) {

        List<Group> groupList = groupRepository.findByUserIdAndUserStatus(authUser.getUserId(),
                UserStatus.ACTIVE);
        return groupList.stream().map(MyGroupResponseDto::from)
                        .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MyGroupResponseDto> searchMyWaitingGroups(AuthUser authUser) {

        List<Group> groupList = groupRepository.findByUserIdAndUserStatus(authUser.getUserId(),
                UserStatus.WAITING);
        return groupList.stream().map(MyGroupResponseDto::from)
                        .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MyGroupResponseDto> searchMyGroupHistory(AuthUser authUser) {

        List<Group> userList = groupRepository.findGroupHistoryByUserId(authUser.getUserId());
        return userList.stream().map(MyGroupResponseDto::from)
                       .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<GroupUserResponseDto> searchGroupParticipant(long groupId, AuthUser leader) {

        Group group = validateGroup(groupId);
        return group.getGroupUsersByUserStatus(leader, UserStatus.WAITING).stream()
                    .map(GroupUserResponseDto::from)
                    .collect(Collectors.toList());
    }

    private Group validateGroup(long groupId) {
        Group group = groupRepository.findByIdWithUser(groupId);
        if (group == null) {
            throw new NotFoundResourceException("그룹을 찾을 수 없습니다.");
        }
        return group;
    }
}
