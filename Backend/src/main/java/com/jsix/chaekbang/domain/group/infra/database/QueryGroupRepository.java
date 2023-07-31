package com.jsix.chaekbang.domain.group.infra.database;

import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.QGroup;
import com.jsix.chaekbang.domain.group.domain.QGroupTag;
import com.jsix.chaekbang.domain.group.domain.QTag;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.util.StringUtils;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;


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

    private QGroup group = QGroup.group;
    private QGroupTag groupTag = QGroupTag.groupTag;
    private QTag tag = QTag.tag;

    public List<Group> findByKeywordAndTags(String keyword, List<Long> tagIds) {

        return jpaQueryFactory.select(group)
                              .from(group)
                              .join(group.groupTags, groupTag)
                              .fetchJoin()
                              .join(groupTag.tag, tag)
                              .fetchJoin()
                              .distinct()
                              .where(inMatchingGroups(tagIds), titleContainsKeyword(keyword),
                                      isNotDeleted())

                              .fetch();
    }

    private BooleanExpression inMatchingGroups(List<Long> tagIds) {
        if (tagIds == null || tagIds.isEmpty()) {
            return null;
        } else {
            return group.id.in(matchingGroups(tagIds));
        }
    }

    private JPAQuery<Long> matchingGroups(List<Long> tagIds) {
        return jpaQueryFactory.select(groupTag.group.id)
                              .from(groupTag)
                              .innerJoin(groupTag.tag, tag)
                              .where(inTags(tagIds));
    }

    private BooleanExpression titleContainsKeyword(String keyword) {
        if (StringUtils.isNullOrEmpty(keyword)) {
            return null;
        } else {
            return group.title.contains(keyword);
        }
    }

    private BooleanExpression inTags(List<Long> tagIds) {
        return groupTag.tag.id.in(tagIds);
    }

}
