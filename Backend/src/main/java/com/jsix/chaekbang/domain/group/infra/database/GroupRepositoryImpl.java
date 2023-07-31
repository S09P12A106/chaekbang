package com.jsix.chaekbang.domain.group.infra.database;

import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
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
}
