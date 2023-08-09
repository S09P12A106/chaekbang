package com.jsix.chaekbang.domain.group.infra.database;

import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.UserStatus;
import com.jsix.chaekbang.domain.group.dto.GroupDetailProjectionResponseDto;
import java.util.List;
import javax.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GroupRepositoryImpl implements GroupRepository {

    private final JpaGroupRepository jpaGroupRepository;
    private final QueryGroupRepository groupQueryRepository;
    private final EntityManager entityManager;

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
    public GroupDetailProjectionResponseDto findGroupDetailByGroupId(long groupId) {
        return groupQueryRepository.findGroupDetailByGroupId(groupId);
    }

    @Override
    public Group findByIdWithUser(Long groupId) {
        return groupQueryRepository.findByIdWithUser(groupId);
    }

    @Override
    public List<Group> findByUserIdAndUserStatus(long userId, UserStatus userStatus) {
        return groupQueryRepository.findGroupByUserIdAndUserStatus(userId, userStatus);
    }

    @Override
    public List<Group> findGroupHistoryByUserId(long userId) {
        return groupQueryRepository.findGroupHistoryByUserId(userId);
    }

}
