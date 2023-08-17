package com.jsix.chaekbang.domain.auth.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RefreshResponseDto {


    private String accessToken;

    public RefreshResponseDto(String accessToken) {
        this.accessToken = accessToken;
    }
}
