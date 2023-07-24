package com.jsix.chaekbang.domain.group.domain;

import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.entity.BaseEntity;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"group_id", "user_id"}
                )
        }
)
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GroupUser extends BaseEntity {

    @Id
    @Column(name = "group_user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private UserStatus status;

    @Column(nullable = false, length = 200, columnDefinition = "VARCHAR(200) default '리더'")
    private String answer;

    @Column(nullable = true)
    private LocalDateTime participatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Builder
    private GroupUser(UserStatus status, String answer, User user, Group group,
            LocalDateTime participatedAt) {
        this.status = status;
        this.answer = answer;
        this.user = user;
        this.group = group;
        this.participatedAt = participatedAt;
    }

    public static GroupUser createGroupParticipant(User user,
            Group group, String answer) {
        return GroupUser.builder()
                        .user(user)
                        .group(group)
                        .answer(answer)
                        .status(UserStatus.WAITING)
                        .build();
    }

    public static GroupUser createGroupLeader(User user, Group group,
            LocalDateTime participatedAt) {
        return GroupUser.builder()
                        .user(user)
                        .group(group)
                        .status(UserStatus.ACTIVE)
                        .participatedAt(participatedAt)
                        .build();
    }

    @PrePersist
    private void setDefaultValues() {
        this.answer = this.answer == null ? "리더" : this.answer;
    }

}