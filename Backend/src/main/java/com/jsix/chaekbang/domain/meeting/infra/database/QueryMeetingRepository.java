package com.jsix.chaekbang.domain.meeting.infra.database;

import com.jsix.chaekbang.domain.group.domain.QGroup;
import com.jsix.chaekbang.domain.group.domain.QGroupUser;
import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.meeting.domain.OpinionBox;
import com.jsix.chaekbang.domain.meeting.domain.QMeeting;
import com.jsix.chaekbang.domain.meeting.domain.QOpinion;
import com.jsix.chaekbang.domain.meeting.domain.QOpinionBox;
import com.jsix.chaekbang.domain.meeting.dto.MeetingSearchResponseDto;
import com.jsix.chaekbang.domain.meeting.dto.QMeetingSearchResponseDto;
import com.jsix.chaekbang.domain.user.domain.QUser;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QueryMeetingRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private QMeeting meeting = QMeeting.meeting;
    private QGroup group = QGroup.group;
    private QGroupUser groupUser = QGroupUser.groupUser;
    private QUser user = QUser.user;
    private QOpinionBox opinionBox = QOpinionBox.opinionBox;
    private QOpinion opinion = QOpinion.opinion1;

    public List<MeetingSearchResponseDto> findByGroupIdWithSlicing(long groupId,
            Pageable pageable) {
        return jpaQueryFactory.select(
                                      new QMeetingSearchResponseDto(meeting.id, meeting.title, meeting.startedAt,
                                              meeting.closedAt)
                              )
                              .from(meeting)
                              .offset(pageable.getOffset())
                              .where(meeting.group.id.eq(groupId))
                              .orderBy(meeting.startedAt.desc())
                              .orderBy(meeting.closedAt.desc())
                              .limit(pageable.getPageSize())
                              .fetch();
    }

    public Meeting findMeetingById(Long id) {
        return jpaQueryFactory.selectFrom(meeting)
                              .innerJoin(meeting.group, group)
                              .fetchJoin()
                              .innerJoin(group.groupUsers, groupUser)
                              .fetchJoin()
                              .innerJoin(groupUser.user, user)
                              .fetchJoin()
                              .where(meeting.id.eq(id))
                              .distinct()
                              .fetchOne();
    }


    public Long findNotClosedMeetingCountByGroupId(long groupId) {
        return jpaQueryFactory.select(meeting.count())
                              .from(meeting)
                              .where(meeting.closedAt.isNull()
                                                     .and(meeting.group.id.eq(groupId)))
                              .fetchOne();
    }

    public List<OpinionBox> findByIdWithOpinionBox(long meetingId) {
        return jpaQueryFactory.select(opinionBox)
                .from(opinionBox)
                .join(opinionBox.opinions, opinion)
                .fetchJoin()
                .where(opinionBox.meeting.id.eq(meetingId))
                .distinct()
                .fetch();
    }

}
