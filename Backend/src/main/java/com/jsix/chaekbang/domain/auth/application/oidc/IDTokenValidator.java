package com.jsix.chaekbang.domain.auth.application.oidc;

import com.jsix.chaekbang.domain.auth.application.jwt.JwtValidator;
import com.jsix.chaekbang.domain.auth.dto.OIDCPublicKeyDto;
import com.jsix.chaekbang.domain.auth.dto.OIDCUser;
import com.jsix.chaekbang.global.exception.NotMatchKIDException;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public abstract class IDTokenValidator {

    private final JwtValidator jwtValidator;

    private final OIDCProperty oidcProperty;

    public IDTokenValidator(JwtValidator jwtValidator, OIDCProperty oidcProperty) {
        this.jwtValidator = jwtValidator;
        this.oidcProperty = oidcProperty;
    }

    public OIDCUser validateIdTokenAndGetUserInfo(String token) {
        jwtValidator.validatePayloadByIssAndAud(token, oidcProperty.getIssuer(),
                oidcProperty.getAudience());
        String kid = jwtValidator.getKidFromHeader(token);

        OIDCPublicKeyDto oidcPublicKeyDto = getOIDCPublicKeyByKID(kid);
        Map<String, Object> payload = jwtValidator.getPayloadFromSignedToken(
                token, oidcPublicKeyDto.getN(), oidcPublicKeyDto.getE());

        return extractUserInfo(payload);
    }

    private OIDCPublicKeyDto getOIDCPublicKeyByKID(String kid) {
        List<OIDCPublicKeyDto> openKeys = getOIDCOpenKeys();
        return openKeys.stream()
                       .filter(o -> o.getKid()
                                     .equals(kid))
                       .findFirst()
                       .orElseThrow(() -> new NotMatchKIDException("일치하는 공개키가 없습니다."));
    }

    public abstract List<OIDCPublicKeyDto> getOIDCOpenKeys();

    public abstract OIDCUser extractUserInfo(Map<String, Object> payload);
}
