package com.jsix.chaekbang.domain.group.domain;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"group_id", "tag_id"}
                )
        }
)
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GroupTag {

    @Id
    @Column(name = "group_tag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;

    @Builder
    private GroupTag(Tag tag, Group group) {
        this.tag = tag;
        this.group = group;
    }

    public static List<GroupTag> createGroupTags(List<Tag> tags, Group group) {
        return tags.stream()
                   .map(t -> {
                       return GroupTag.builder()
                                      .tag(t)
                                      .group(group)
                                      .build();
                   })
                   .toList();
    }

}