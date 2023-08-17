package com.jsix.chaekbang.domain.group.infra.database;


import static com.jsix.chaekbang.domain.meeting.domain.QMeeting.meeting;

import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.QGroup;
import com.jsix.chaekbang.domain.group.domain.QGroupTag;
import com.jsix.chaekbang.domain.group.domain.QGroupUser;
import com.jsix.chaekbang.domain.group.domain.QHistory;
import com.jsix.chaekbang.domain.group.domain.QTag;
import com.jsix.chaekbang.domain.group.domain.UserStatus;
import com.jsix.chaekbang.domain.group.dto.GroupDetailProjectionResponseDto;
import com.jsix.chaekbang.domain.group.dto.GroupParticipantResponseDto;
import com.jsix.chaekbang.domain.group.dto.QGroupDetailProjectionResponseDto;
import com.jsix.chaekbang.domain.group.dto.QGroupParticipantResponseDto;
import com.jsix.chaekbang.domain.user.domain.QUser;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.util.StringUtils;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class QueryGroupRepository {

    private final JPAQueryFactory jpaQueryFactory;

    private List<Long> findMostReadCountId() {
        return jpaQueryFactory.select(group.id)
                              .from(group)
                              .orderBy(group.readCount.desc())
                              .limit(8)
                              .fetch();
    }

    public List<Group> findMostReadCount() {
        return jpaQueryFactory.selectFrom(group)
                              .leftJoin(group.groupTags, groupTag)
                              .fetchJoin()
                              .leftJoin(groupTag.tag, tag)
                              .fetchJoin()
                              .where(group.id.in(findMostReadCountId()))
                              .orderBy(group.readCount.desc())
                              .distinct()
                              .fetch();
    }

    public List<Group> findMostTaggedCountByTagId(Long tagId) {
        return jpaQueryFactory.select(group)
                              .from(group)
                              .innerJoin(group.groupTags, groupTag)
                              .fetchJoin()
                              .innerJoin(groupTag.tag, tag)
                              .fetchJoin()
                              .distinct()
                              .where(group.id.in(getGroupIdsContainsTagName(tagId)),
                                      isNotDeleted())
                              .fetch();
    }

    private List<Long> getGroupIdsContainsTagName(Long tagId) {
        return jpaQueryFactory.select(group.id)
                              .from(group)
                              .innerJoin(group.groupTags, groupTag)
                              .innerJoin(groupTag.tag, tag)
                              .where(tag.id.eq(tagId))
                              .orderBy(group.readCount.desc())
                              .limit(8)
                              .fetch();
    }

    private BooleanExpression isNotDeleted() {
        return group.deleted.eq(false);
    }

    private QGroup group = QGroup.group;
    private QGroupTag groupTag = QGroupTag.groupTag;
    private QTag tag = QTag.tag;
    private QUser user = QUser.user;
    private QHistory history = QHistory.history;
    private QGroupUser groupUser = QGroupUser.groupUser;

    private List<Long> findIdsByKeywordAndTags(String keyword, List<Long> tagIds,
            Pageable pageable) {
        return jpaQueryFactory.select(
                                      group.id
                              )
                              .from(group)
                              .offset(pageable.getOffset())
                              .limit(pageable.getPageSize())
                              .where(inMatchingGroups(tagIds), titleContainsKeyword(keyword),
                                      isNotDeleted(), group.opened.eq(true))
                              .orderBy(group.id.desc())
                              .fetch();
    }

    public List<Group> findByKeywordAndTags(String keyword, List<Long> tagIds, Pageable pageable) {

        return jpaQueryFactory.select(group)
                              .from(group)
                              .leftJoin(group.groupTags, groupTag)
                              .fetchJoin()
                              .leftJoin(groupTag.tag, tag)
                              .fetchJoin()
                              .where(
                                      group.id.in(
                                              findIdsByKeywordAndTags(keyword, tagIds, pageable))
                              )
                              .distinct()
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

    public GroupDetailProjectionResponseDto findGroupDetailByGroupId(long groupId) {
        return jpaQueryFactory.select(
                                      new QGroupDetailProjectionResponseDto(group,
                                              user.profileImageUrl, user.aboutMe, user.nickname))
                              .from(group)
                              .innerJoin(user)
                              .on(group.leaderId.eq(user.id))
                              .leftJoin(group.groupTags, groupTag)
                              .fetchJoin()
                              .leftJoin(groupTag.tag, tag)
                              .fetchJoin()
                              .where(group.id.eq(groupId))
                              .distinct()
                              .fetchFirst();
    }

    public Group findByGroupIdAndUserStatus(long groupId, UserStatus userStatus) {
        return jpaQueryFactory.select(group)
                              .from(group)
                              .join(group.groupUsers, groupUser)
                              .fetchJoin()
                              .join(groupUser.user, user)
                              .fetchJoin()
                              .where(group.id.eq(groupId)
                                             .and(groupUser.status.eq(userStatus)))
                              .fetchOne();
    }

    public List<Group> findGroupByUserIdAndUserStatus(long userId, UserStatus userStatus) {
        return jpaQueryFactory.select(group)
                              .from(group)
                              .innerJoin(groupUser)
                              .on(group.id.eq(groupUser.group.id))
                              .leftJoin(group.groupTags, groupTag)
                              .fetchJoin()
                              .leftJoin(groupTag.tag, tag)
                              .fetchJoin()
                              .where(groupUser.user.id.eq(userId)
                                                      .and(groupUser.status.eq(userStatus)))
                              .distinct()
                              .fetch();
    }

    public List<Group> findGroupHistoryByUserId(long userId) {
        return jpaQueryFactory.select(group)
                              .from(history)
                              .innerJoin(group)
                              .on(group.id.eq(history.group.id))
                              .leftJoin(group.groupTags, groupTag)
                              .fetchJoin()
                              .leftJoin(groupTag.tag, tag)
                              .fetchJoin()
                              .where(history.user.id.eq(userId))
                              .distinct()
                              .fetch();
    }

    public List<GroupParticipantResponseDto> findByIdAndLeaderWithAnswer(long groupId,
            long leaderId) {
        return jpaQueryFactory.select(
                                      new QGroupParticipantResponseDto(
                                              user.id, user.nickname, user.gender, user.profileImageUrl, user.aboutMe,
                                              user.groupCount, user.email, groupUser.answer
                                      ))
                              .from(group)
                              .join(group.groupUsers, groupUser)
                              .join(groupUser.user, user)
                              .where(group.id.eq(groupId)
                                             .and(groupUser.status.eq(UserStatus.WAITING))
                                             .and(group.leaderId.eq(leaderId)))
                              .fetch();
    }


    public Group findGroupByMeetingId(Long meetingId) {
        return jpaQueryFactory.selectFrom(group)
                              .join(group.meetings, meeting)
                              .where(meeting.id.eq(meetingId))
                              .fetchOne();
    }
}
