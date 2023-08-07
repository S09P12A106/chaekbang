package com.jsix.chaekbang.domain.group.application;

import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.application.repository.TagRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.Tag;
import com.jsix.chaekbang.domain.group.dto.GroupDetailResponseDto;
import com.jsix.chaekbang.domain.group.dto.GroupSearchRequestDto;
import com.jsix.chaekbang.domain.group.dto.GroupUserResponseDto;
import com.jsix.chaekbang.domain.group.dto.GroupWithUserAndTagResponseDto;
import com.jsix.chaekbang.domain.group.dto.MostTaggedGroupsResponseDto;
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
        if (groupRepository.plusReadCount(groupId) == 0) {
            throw new NotFoundResourceException("해당 그룹이 존재하지 않습니다.");
        }

        return groupRepository.findGroupDetailByGroupId(groupId);
    }

    @Transactional(readOnly = true)
    public List<GroupUserResponseDto> searchGroupUsers(long groupId) {
        return groupRepository.findGroupUsersByGroupId(groupId);
    }
}
