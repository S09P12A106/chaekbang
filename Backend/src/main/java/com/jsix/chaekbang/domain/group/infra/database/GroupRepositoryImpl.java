package com.jsix.chaekbang.domain.group.infra.database;

import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.dto.GroupDetailResponseDto;
import com.jsix.chaekbang.domain.group.dto.GroupUserResponseDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GroupRepositoryImpl implements GroupRepository {

    private final JpaGroupRepository jpaGroupRepository;
    private final QueryGroupRepository groupQueryRepository;

    @Override
    public Group save(Group group) {
        return jpaGroupRepository.save(group);
    }

    @Override
    public List<Group> findMostReadCount() {
        return groupQueryRepository.findMostReadCount();
    }

    @Override
    public List<Group> findMostTaggedCountByTagName(String tagName) {
        return groupQueryRepository.findMostTaggedCountByTagName(tagName);
    }

    public List<Group> findByKeywordAndTags(String keyword, List<Long> tagIds) {
        return groupQueryRepository.findByKeywordAndTags(keyword, tagIds);
    }

    @Override
    public GroupDetailResponseDto findGroupDetailByGroupId(long groupId) {
        return groupQueryRepository.findGroupDetailByGroupId(groupId);
    }

    @Override
    public List<GroupUserResponseDto> findGroupUsersByGroupId(long groupId) {
        return groupQueryRepository.findGroupUsersByGroupId(groupId);
    }

    @Override
    public int plusReadCount(long groupId) {
        return jpaGroupRepository.plusReadCount(groupId);
    }
}
