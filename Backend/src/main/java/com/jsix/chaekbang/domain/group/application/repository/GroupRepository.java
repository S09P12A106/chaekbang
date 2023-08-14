package com.jsix.chaekbang.domain.group.application.repository;

import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.UserStatus;
import com.jsix.chaekbang.domain.group.dto.GroupDetailProjectionResponseDto;
import com.jsix.chaekbang.domain.group.dto.GroupParticipantResponseDto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;

public interface GroupRepository {

    Group save(Group group);

    Optional<Group> findById(Long id);

    List<Group> findMostReadCount();

    List<Group> findMostTaggedCountByTagName(String tagName);

    List<Group> findByKeywordAndTags(String keyword, List<Long> tagIds, Pageable pageable);

    GroupDetailProjectionResponseDto findGroupDetailByGroupId(long groupId);

    Group findByGroupIdAndUserStatus(Long groupId, UserStatus userStatus);

    List<Group> findByUserIdAndUserStatus(long userId, UserStatus userStatus);

    List<Group> findGroupHistoryByUserId(long userId);

    List<GroupParticipantResponseDto> findByIdAndLeaderWithAnswer(long userId, long leaderId);

    boolean existsByGroupIdAndUserId(long userId, long groupId);

}
