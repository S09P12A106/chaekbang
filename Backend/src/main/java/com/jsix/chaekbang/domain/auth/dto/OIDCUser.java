package com.jsix.chaekbang.domain.auth.dto;

import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import lombok.Builder;
import lombok.Getter;


@Getter
public class OIDCUser {

    private OAuthProvider oAuthProvider;
    private String oauthId;

    private String email;
    private String profileImageUrl;

    @Builder
    public OIDCUser(OAuthProvider oAuthProvider, String oauthId, String email,
            String profileImageUrl) {
        this.oAuthProvider = oAuthProvider;
        this.oauthId = oauthId;
        this.email = email;
        this.profileImageUrl = profileImageUrl;
    }
}
