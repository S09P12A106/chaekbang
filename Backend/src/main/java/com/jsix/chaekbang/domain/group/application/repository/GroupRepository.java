package com.jsix.chaekbang.domain.group.application.repository;

import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.dto.GroupDetailResponseDto;
import com.jsix.chaekbang.domain.group.dto.GroupUserResponseDto;
import java.util.List;

public interface GroupRepository {

    Group save(Group group);

    List<Group> findMostReadCount();

    List<Group> findMostTaggedCountByTagName(String tagName);

    List<Group> findByKeywordAndTags(String keyword, List<Long> tagIds);


    GroupDetailResponseDto findGroupDetailByGroupId(long groupId);

    List<GroupUserResponseDto> findGroupUsersByGroupId(long groupId);

    int plusReadCount(long groupId);

}
