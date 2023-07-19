package com.jsix.chaekbang.domain.group.domain;

import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;


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

    @Column(nullable = false, length = 200)
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
    private GroupUser(UserStatus status, String answer) {
        this.status = status;
        this.answer = answer;
    }

    public static GroupUser createGroupUser(UserStatus status, String answer) {
        return GroupUser.builder()
                        .status(status)
                        .answer(answer)
                        .build();
    }
}