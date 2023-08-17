package com.jsix.chaekbang.domain.meeting.domain;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OpinionBox {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "opinion_box_id")
    private Long id;

    @Column(nullable = false, length = 100)
    private String topic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id", nullable = false)
    private Meeting meeting;

    @OneToMany(mappedBy = "opinionBox")
    private List<Opinion> opinions = new ArrayList<>();

    public void addOpinion(Opinion opinion) {
        this.opinions.add(opinion);
    }

    @Builder
    private OpinionBox(String topic, Meeting meeting) {
        this.topic = topic;
        this.meeting = meeting;
    }

    public static OpinionBox createOpinionBox(String topic, Meeting meeting) {
        OpinionBox opinionBox = OpinionBox.builder()
                                          .topic(topic)
                                          .meeting(meeting)
                                          .build();
        meeting.addOpinionBox(opinionBox);
        return opinionBox;
    }

}
