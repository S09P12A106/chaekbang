package com.jsix.chaekbang.domain.auth.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class OIDCLoginResponseDto {

    boolean isNewUser;
    String accessToken;
    String refreshToken;


    public OIDCLoginResponseDto(boolean isNewUser, String accessToken, String refreshToken) {
        this.isNewUser = isNewUser;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public static OIDCLoginResponseDto isNew() {
        return new OIDCLoginResponseDto(true, null, null);
    }

    public static OIDCLoginResponseDto logined(String accessToken, String refreshToken) {
        return new OIDCLoginResponseDto(false, accessToken, refreshToken);
    }

}
