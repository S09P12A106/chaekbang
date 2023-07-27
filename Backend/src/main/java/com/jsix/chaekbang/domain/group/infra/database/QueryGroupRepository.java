package com.jsix.chaekbang.domain.group.infra.database;

import static com.jsix.chaekbang.domain.group.domain.QGroup.group;
import static com.jsix.chaekbang.domain.group.domain.QGroupTag.groupTag;
import static com.jsix.chaekbang.domain.group.domain.QTag.tag;

import com.jsix.chaekbang.domain.group.domain.Group;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QueryGroupRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<Group> findMostReadCount() {
        return jpaQueryFactory.selectFrom(group)
                              .leftJoin(group.groupTags, groupTag)
                              .fetchJoin()
                              .leftJoin(groupTag.tag, tag)
                              .fetchJoin()
                              .distinct()
                              .orderBy(group.readCount.desc())
                              .limit(8)
                              .fetch();
    }

    public List<Group> findMostTaggedCountByTagName(String tagName) {
        return jpaQueryFactory.select(group)
                              .from(group)
                              .innerJoin(group.groupTags, groupTag)
                              .fetchJoin()
                              .innerJoin(groupTag.tag, tag)
                              .fetchJoin()
                              .distinct()
                              .where(group.id.in(getGroupIdsContainsTagName(tagName)),
                                      isNotDeleted())
                              .fetch();
    }

    private JPQLQuery<Long> getGroupIdsContainsTagName(String tagName) {
        return JPAExpressions.select(groupTag.group.id)
                             .from(groupTag)
                             .innerJoin(groupTag.tag, tag)
                             .where(tag.tagName.eq(tagName));
    }

    private BooleanExpression isNotDeleted() {
        return group.deleted.eq(false);
    }

}
