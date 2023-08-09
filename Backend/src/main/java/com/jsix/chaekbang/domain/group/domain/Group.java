package com.jsix.chaekbang.domain.group.domain;

import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.entity.BaseEntity;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

@Entity
@Getter
@Table(name = "\"group\"")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Group extends BaseEntity {

    @Id
    @Column(name = "group_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 30)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String detail;

    @Column(nullable = false, length = 100)
    private String question;

    @Column(nullable = false)
    private Long leaderId;

    @Column(nullable = false, columnDefinition = "boolean default true")
    private Boolean opened;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private Boolean deleted;

    @Column(nullable = false, columnDefinition = "int default 0")
    private Integer readCount;

    @Column(nullable = false, columnDefinition = "VARCHAR(200) default 'defaultImageUrl'")
    private String imageUrl;

    @OneToMany(mappedBy = "group", cascade = CascadeType.PERSIST)
    private List<GroupTag> groupTags = new ArrayList<>();

    @OneToMany(mappedBy = "group", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<GroupUser> groupUsers = new ArrayList<>();

    @OneToMany(mappedBy = "group")
    private List<Meeting> meetings = new ArrayList<>();

    @Formula("(select count(*) "
            + "from group_user gu "
            + "where gu.group_id = group_id "
            + "and gu.status = 'ACTIVE')")
    private Integer joinedUserCount;

    @Builder
    private Group(String title, String detail, String question, String imageUrl, Long leaderId) {
        this.title = title;
        this.detail = detail;
        this.question = question;
        this.imageUrl = imageUrl;
        this.leaderId = leaderId;
    }

    public static Group createGroup(String title, String detail, String imageUrl, String question,
            User leader) {
        Group group = Group.builder()
                           .title(title)
                           .detail(detail)
                           .question(question)
                           .imageUrl(imageUrl)
                           .leaderId(leader.getId())
                           .build();
        group.addGroupUser(GroupUser.createGroupLeader(leader, group, LocalDateTime.now()));
        return group;
    }

    public void joinGroup(User user, String answer) {
        if (checkExistedUser(user)) {
            throw new NotFoundResourceException("이미 신청한 유저입니다.");
        }

        this.groupUsers.add(GroupUser.createGroupParticipant(user, this, answer));
    }

    public void cancelGroup(User user) {
        GroupUser target = validateUser(user);

        if (target.getStatus().equals(UserStatus.ACTIVE)) {
            throw new NotFoundResourceException("참여 대기중인 유저가 아닙니다.");
        }
        removeTarget(target);
    }

    private boolean checkExistedUser(User user) {
        return this.groupUsers.stream().anyMatch(
                groupUser -> groupUser.getUser().equals(user));
    }

    public void approveGroup(User user, long leaderId) {
        validateLeader(leaderId);
        GroupUser target = validateUser(user);

        if (target.getStatus().equals(UserStatus.ACTIVE)) {
            throw new NotFoundResourceException("참여 대기중인 유저가 아닙니다.");
        }

        target.approve(LocalDateTime.now());
    }

    public void disapproveGroup(User user, long leaderId) {
        validateLeader(leaderId);
        GroupUser target = validateUser(user);

        if (target.getStatus().equals(UserStatus.ACTIVE)) {
            throw new NotFoundResourceException("참여 대기중인 유저가 아닙니다.");
        }
        removeTarget(target);
    }

    public LocalDateTime withdrawGroup(User user, long leaderId) {
        validateLeader(leaderId);
        GroupUser target = validateUser(user);

        if (target.getStatus().equals(UserStatus.WAITING)) {
            throw new NotFoundResourceException("참여중인 유저가 아닙니다.");
        }
        removeTarget(target);
        return target.getParticipatedAt();
    }

    public LocalDateTime leaveGroup(User user) {
        GroupUser target = validateUser(user);

        if (target.getStatus().equals(UserStatus.WAITING)) {
            throw new NotFoundResourceException("참여중인 유저가 아닙니다.");
        }
        removeTarget(target);
        return target.getParticipatedAt();
    }

    private GroupUser validateUser(User user) {
        return this.groupUsers.stream()
                              .filter(groupUser -> groupUser.getUser().equals(user))
                              .findFirst()
                              .orElseThrow(() -> new NotFoundResourceException(
                                      "신청하지 않은 유저입니다."));
    }

    private void validateLeader(long leaderId) {
        if (!this.leaderId.equals(leaderId)) {
            throw new NotFoundResourceException("해당 그룹의 리더가 아닙니다.");
        }
    }

    private void removeTarget(GroupUser target) {
        this.groupUsers.removeIf(groupUser -> groupUser.equals(target));
    }

    public void addTags(List<Tag> tags) {
        List<GroupTag> groupTags = GroupTag.createGroupTags(tags, this);
        this.groupTags.addAll(groupTags);
    }

    public void addGroupUser(GroupUser groupUser) {
        this.groupUsers.add(groupUser);
    }

    public void addMeeting(Meeting meeting) {
        this.meetings.add(meeting);
    }

    @PrePersist
    private void setDefaultValues() {
        this.opened = this.opened == null ? true : this.opened;
        this.deleted = this.deleted == null ? false : this.deleted;
        this.readCount = this.readCount == null ? 0 : this.readCount;
        this.imageUrl = this.imageUrl == null
                ? "https://chaekbang-bucket.s3.ap-northeast-2.amazonaws.com/group/image/chaekbang_default_image.jpeg"
                : this.imageUrl;
    }

    public List<User> getGroupUsersByUserStatus(AuthUser leader, UserStatus userStatus) {
        if (leader != null) {
            validateLeader(leader.getUserId());
        }
        return this.groupUsers.stream()
                              .filter(groupUser -> groupUser.getStatus().equals(userStatus))
                              .map(GroupUser::getUser).collect(
                        Collectors.toList());
    }

    public void plusReadCount() {
        this.readCount += 1;
    }
}