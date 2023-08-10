package com.jsix.chaekbang.domain.group.application.repository;

import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.UserStatus;
import com.jsix.chaekbang.domain.group.dto.GroupDetailProjectionResponseDto;
import com.jsix.chaekbang.domain.group.dto.GroupParticipantResponseDto;
import java.util.List;
import java.util.Optional;

public interface GroupRepository {

    Group save(Group group);

    Optional<Group> findById(Long id);

    List<Group> findMostReadCount();

    List<Group> findMostTaggedCountByTagName(String tagName);

    List<Group> findByKeywordAndTags(String keyword, List<Long> tagIds);

    GroupDetailProjectionResponseDto findGroupDetailByGroupId(long groupId);

    Group findByIdWithActiveUser(Long groupId);

    List<Group> findByUserIdAndUserStatus(long userId, UserStatus userStatus);

    List<Group> findGroupHistoryByUserId(long userId);

    List<GroupParticipantResponseDto> findByIdAndLeaderWithAnswer(long userId, long leaderId);

}
