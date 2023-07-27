package com.jsix.chaekbang.domain.auth.dto;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OIDCPublicKeyResponse {

    List<OIDCPublicKeyDto> keys;
}
