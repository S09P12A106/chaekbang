package com.jsix.chaekbang.domain.group.application.repository;

import com.jsix.chaekbang.domain.group.domain.Group;
import java.util.List;

public interface GroupRepository {

    Group save(Group group);

    List<Group> findMostReadCount();

    List<Group> findMostTaggedCountByTagName(String tagName);

}
