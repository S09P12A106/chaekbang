package com.jsix.chaekbang.domain.auth.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Setter
public class SignUpResponseDto {

    private String accessToken;

    private String refreshToken;

    public SignUpResponseDto(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public SignUpResponseDto from(Token token) {
        return new SignUpResponseDto(token.getAccessToken(), token.getRefreshToken());
    }
}
