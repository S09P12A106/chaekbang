package com.jsix.chaekbang.domain.group.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tag {

    @Id
    @Column(name = "tag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 10)
    private String tagName;

    @Column(nullable = false, columnDefinition = "int default 1")
    private Integer taggedCount;

    @Builder
    private Tag(String tagName) {
        this.tagName = tagName;
    }

    public static Tag createTag(String tagName) {
        return Tag.builder()
                  .tagName(tagName)
                  .build();
    }

    public void plusTaggedCount() {
        this.taggedCount++;
    }

    public void minusTaggedCount() {
        if(this.taggedCount > 0)
            this.taggedCount--;
    }
    
    @PrePersist
    private void setDefaultValues() {
        this.taggedCount = this.taggedCount == null ? 1 : this.taggedCount;
    }
}