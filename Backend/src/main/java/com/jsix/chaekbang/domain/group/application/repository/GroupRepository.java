package com.jsix.chaekbang.domain.group.application.repository;

import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.UserStatus;
import com.jsix.chaekbang.domain.group.dto.GroupDetailProjectionResponseDto;
import java.util.List;

public interface GroupRepository {

    Group save(Group group);

    List<Group> findMostReadCount();

    List<Group> findMostTaggedCountByTagName(String tagName);

    List<Group> findByKeywordAndTags(String keyword, List<Long> tagIds);


    GroupDetailProjectionResponseDto findGroupDetailByGroupId(long groupId);

    Group findByIdWithUser(Long groupId);

    List<Group> findByUserIdAndUserStatus(long userId, UserStatus userStatus);

    List<Group> findGroupHistoryByUserId(long userId);
}
