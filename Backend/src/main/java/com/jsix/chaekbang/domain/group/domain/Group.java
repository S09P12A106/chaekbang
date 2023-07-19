package com.jsix.chaekbang.domain.group.domain;

import com.jsix.chaekbang.global.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    @Column(nullable = false, columnDefinition = "boolean default true")
    private Boolean opened;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private Boolean deleted;

    @Column(nullable = false, columnDefinition = "int default 0")
    private Integer readCount;

    @Column(nullable = false, columnDefinition = "VARCHAR(100) default 'defaultImageUrl'")
    private String imageUrl;

    @Builder
    private Group(String title, String detail, String question, String imageUrl) {
        this.title = title;
        this.detail = detail;
        this.question = question;
        this.imageUrl = imageUrl;
    }

    public static Group createGroup(String title, String detail, String imageUrl, String question) {
        return Group.builder()
                    .title(title)
                    .detail(detail)
                    .question(question)
                    .imageUrl(imageUrl)
                    .build();
    }

    @PrePersist
    private void setDefaultValues() {
        this.opened = this.opened == null ? true : this.opened;
        this.deleted = this.deleted == null ? false : this.deleted;
        this.readCount = this.readCount == null ? 0 : this.readCount;
        this.imageUrl = this.imageUrl == null ? "defaultImageUrl" : this.imageUrl;
    }

}