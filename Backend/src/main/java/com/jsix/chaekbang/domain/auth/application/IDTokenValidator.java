package com.jsix.chaekbang.domain.auth.application;

import com.jsix.chaekbang.domain.auth.dto.OIDCPublicKeyDto;
import com.jsix.chaekbang.domain.auth.infra.JWTValidator;
import com.jsix.chaekbang.global.exception.NotMatchKIDException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public abstract class IDTokenValidator {

    private final JWTValidator jwtValidator;

    String iss;
    String aud;
    private final String KID = "kid";

    public String getOauthIDFromSignedToken(String token) {
        String kid = (String) jwtValidator.validateTokenByIssAndAud(token, iss, aud).getHeader()
                                          .get(KID);
        OIDCPublicKeyDto oidcPublicKeyDto = getOIDCPublicKeyByKID(kid);

        return jwtValidator.getOauthIDFromSignedToken(
                token, oidcPublicKeyDto.getN(), oidcPublicKeyDto.getE());
    }

    private OIDCPublicKeyDto getOIDCPublicKeyByKID(String kid) {
        List<OIDCPublicKeyDto> openKeys = getOIDCOpenKeys();
        return openKeys.stream()
                       .filter(o -> o.getKid().equals(kid))
                       .findFirst()
                       .orElseThrow(() -> new NotMatchKIDException("일치하는 공개키가 없습니다."));
    }

    public abstract List<OIDCPublicKeyDto> getOIDCOpenKeys();

}
