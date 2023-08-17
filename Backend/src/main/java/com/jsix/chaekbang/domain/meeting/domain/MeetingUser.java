package com.jsix.chaekbang.domain.meeting.domain;

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
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetingUser {

    @Id
    @Column(name = "meeting_user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id", nullable = false)
    private Meeting meeting;

    @Column(nullable = false)
    private LocalDateTime enteredAt;

    @Column(nullable = false)
    private LocalDateTime leftAt;

    @Builder
    public MeetingUser(User user, Meeting meeting, LocalDateTime enteredAt, LocalDateTime leftAt) {
        this.user = user;
        this.meeting = meeting;
        this.enteredAt = enteredAt;
        this.leftAt = leftAt;
    }

    public void updateLeftAt(LocalDateTime leftAt) {
        this.leftAt = leftAt;
    }
}
