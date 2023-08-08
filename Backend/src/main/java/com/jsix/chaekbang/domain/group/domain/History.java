package com.jsix.chaekbang.domain.group.domain;

import com.jsix.chaekbang.domain.user.domain.User;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(
        name = "group_participant_history"
)
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class History {

    @Id
    @Column(name = "history_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime participatedAt;

    @Column(nullable = false)
    private LocalDateTime withdrawedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Builder
    private History(Group group, User user, LocalDateTime participatedAt,
            LocalDateTime withdrawedAt) {
        this.group = group;
        this.user = user;
        this.participatedAt = participatedAt;
        this.withdrawedAt = withdrawedAt;
    }

    public static History createHistory(Group group, User user, LocalDateTime participatedAt,
            LocalDateTime withdrawedAt) {
        return History.builder()
                      .group(group)
                      .user(user)
                      .participatedAt(participatedAt)
                      .withdrawedAt(withdrawedAt)
                      .build();
    }
}
