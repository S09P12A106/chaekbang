package com.jsix.chaekbang.domain.user.domain;

import com.jsix.chaekbang.global.entity.BaseEntity;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"oauth_provider", "oauth_id"}
                )
        }
)
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "oauth_provider", length = 10)
    private OAuthProvider oauthProvider;

    @Column(nullable = false, name = "oauth_id", length = 100)
    private String oauthId;

    @Column(nullable = false, length = 30)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 1)
    private Gender gender;

    @Column(nullable = false)
    private LocalDate birthDate;

    @Column(nullable = true, length = 100)
    private String profileImageUrl;

    @Column(nullable = false, length = 100)
    private String aboutMe;

    @Column(nullable = false, length = 20)
    private String nickname;

    @Column(length = 200)
    private String refreshToken;

    @Builder
    private User(OAuthProvider oAuthProvider, String oAuthId,
            String email, Gender gender,
            LocalDate birthDate,
            String profileImageUrl, String aboutMe, String nickname) {
        this.oauthProvider = oAuthProvider;
        this.oauthId = oAuthId;
        this.email = email;
        this.gender = gender;
        this.birthDate = birthDate;
        this.profileImageUrl = profileImageUrl;
        this.aboutMe = aboutMe;
        this.nickname = nickname;
    }

    public static User createUser(OAuthProvider oAuthProvider,
            String oAuthId, String email,
            Gender gender,
            LocalDate birthDate, String profileImageUrl, String aboutMe, String nickname) {
        return User.builder()
                   .oAuthProvider(oAuthProvider)
                   .oAuthId(oAuthId)
                   .email(email)
                   .gender(gender)
                   .birthDate(birthDate)
                   .profileImageUrl(profileImageUrl)
                   .aboutMe(aboutMe)
                   .nickname(nickname)
                   .build();
    }

    public void setRefreshToken(String token) {
        this.refreshToken = token;
    }

    public void logout() {
        this.refreshToken = null;
    }
}