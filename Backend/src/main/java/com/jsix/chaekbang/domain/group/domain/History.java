package com.jsix.chaekbang.domain.group.domain;

import com.jsix.chaekbang.domain.user.domain.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(
        name = "group_participant_history",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"group_id", "user_id"}
                )
        }
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
    private History(LocalDateTime participatedAt, LocalDateTime withdrawedAt) {
        this.participatedAt = participatedAt;
        this.withdrawedAt = withdrawedAt;
    }

    public static History createHistory(LocalDateTime participatedAt, LocalDateTime withdrawedAt) {
        return History.builder()
                      .participatedAt(participatedAt)
                      .withdrawedAt(withdrawedAt)
                      .build();
    }

}
