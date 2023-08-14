package com.jsix.chaekbang.domain.group.infra.database;

import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.UserStatus;
import com.jsix.chaekbang.domain.group.dto.GroupDetailProjectionResponseDto;
import com.jsix.chaekbang.domain.group.dto.GroupParticipantResponseDto;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GroupRepositoryImpl implements GroupRepository {

    private final JpaGroupRepository jpaGroupRepository;
    private final QueryGroupRepository groupQueryRepository;
    private final JpaGroupUserRepository jpaGroupUserRepository;

    @Override
    public Group save(Group group) {
        return jpaGroupRepository.save(group);
    }

    @Override
    public Optional<Group> findById(Long id) {
        return jpaGroupRepository.findById(id);
    }

    @Override
    public List<Group> findMostReadCount() {
        return groupQueryRepository.findMostReadCount();
    }

    @Override
    public List<Group> findMostTaggedCountByTagName(String tagName) {
        return groupQueryRepository.findMostTaggedCountByTagName(tagName);
    }

    public List<Group> findByKeywordAndTags(String keyword, List<Long> tagIds, Pageable pageable) {
        return groupQueryRepository.findByKeywordAndTags(keyword, tagIds, pageable);
    }

    @Override
    public GroupDetailProjectionResponseDto findGroupDetailByGroupId(long groupId) {
        return groupQueryRepository.findGroupDetailByGroupId(groupId);
    }

    @Override
    public Group findByGroupIdAndUserStatus(Long groupId, UserStatus userStatus) {
        return groupQueryRepository.findByGroupIdAndUserStatus(groupId, userStatus);
    }

    @Override
    public List<Group> findByUserIdAndUserStatus(long userId, UserStatus userStatus) {
        return groupQueryRepository.findGroupByUserIdAndUserStatus(userId, userStatus);
    }

    public List<Group> findGroupHistoryByUserId(long userId) {
        return groupQueryRepository.findGroupHistoryByUserId(userId);
    }

    @Override
    public List<GroupParticipantResponseDto> findByIdAndLeaderWithAnswer(long userId, long leaderId) {
        return groupQueryRepository.findByIdAndLeaderWithAnswer(userId, leaderId);
    }

    @Override
    public boolean existsByGroupIdAndUserId(long groupId, long userId) {
        return jpaGroupUserRepository.existsByGroup_IdAndStatusAndUser_Id(groupId, UserStatus.WAITING, userId);
    }
}
