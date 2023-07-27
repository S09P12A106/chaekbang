package com.jsix.chaekbang.domain.auth.infra;

import com.jsix.chaekbang.global.exception.BusinessException;
import com.jsix.chaekbang.global.exception.ExpiredTokenException;
import com.jsix.chaekbang.global.exception.InvalidTokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import java.math.BigInteger;
import java.security.Key;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import org.springframework.stereotype.Component;

@Component
public class JWTValidator {

    private final String KID = "kid";

    private String parseToken(String token) {
        String[] splitToken = token.split("\\.");
        if (splitToken.length != 3) {
            throw new InvalidTokenException("유효하지 않은 토큰입니다.");
        }
        return splitToken[0] + "." + splitToken[1] + ".";
    }


    public Jwt<Header, Claims> validateTokenByIssAndAud(String token, String iss, String aud) {
        try {
            return Jwts.parserBuilder()
                       .requireAudience(aud)
                       .requireIssuer(iss)
                       .build()
                       .parseClaimsJwt(parseToken(token));
        } catch (ExpiredJwtException e) {
            throw new ExpiredTokenException("만료된 토큰입니다.");
        } catch (Exception e) {
            throw new InvalidTokenException("유효하지 않은 토큰입니다.");
        }
    }


    public Jws<Claims> validateSignature(String token, String modulus, String exponent) {
        try {
            return Jwts.parserBuilder()
                       .setSigningKey(getRSAPublicKey(modulus, exponent))
                       .build()
                       .parseClaimsJws(token);
        } catch (ExpiredJwtException e) {
            throw new ExpiredTokenException("만료된 토큰입니다.");
        } catch (Exception e) {
            throw new InvalidTokenException("유효하지 않은 토큰입니다.");
        }
    }

    public String getOauthIDFromSignedToken(String token, String modulus, String exponent) {
        Claims body = validateSignature(token, modulus, exponent).getBody();
        return body.getSubject();
    }

    private Key getRSAPublicKey(String modulus, String exponent)
            throws InvalidKeySpecException, NoSuchAlgorithmException {
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        byte[] decodeN = Base64.getUrlDecoder().decode(modulus);
        byte[] decodeE = Base64.getUrlDecoder().decode(exponent);
        BigInteger n = new BigInteger(1, decodeN);
        BigInteger e = new BigInteger(1, decodeE);

        RSAPublicKeySpec keySpec = new RSAPublicKeySpec(n, e);
        return keyFactory.generatePublic(keySpec);
    }
}
