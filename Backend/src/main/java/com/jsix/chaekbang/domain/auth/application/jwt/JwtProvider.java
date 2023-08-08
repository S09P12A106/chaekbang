package com.jsix.chaekbang.domain.auth.application.jwt;


import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.exception.AuthenticationFailException;
import com.jsix.chaekbang.global.property.JwtProperty;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import org.springframework.stereotype.Component;
import org.springframework.util.Base64Utils;

@Component
public class JwtProvider {

    private final Key accessKey;
    private final Key refreshKey;
    private final Integer accessExpiredMin;
    private final Integer refreshExpiredDay;

    public JwtProvider(JwtProperty jwtProperty) {
        byte[] accessEncodeByte = Base64Utils.encode(jwtProperty.getAccessKey()
                                                                .getBytes());
        byte[] refreshEncodeByte = Base64Utils.encode(jwtProperty.getRefreshKey()
                                                                 .getBytes());
        this.accessExpiredMin = jwtProperty.getAccessExpiredMin();
        this.refreshExpiredDay = jwtProperty.getRefreshExpiredDay();
        this.accessKey = Keys.hmacShaKeyFor(accessEncodeByte);
        this.refreshKey = Keys.hmacShaKeyFor(refreshEncodeByte);
    }


    public String generateAccessToken(User user) {
        Instant accessExpiredTime = Instant.now()
                                           .plus(this.accessExpiredMin, ChronoUnit.MINUTES);
        return Jwts.builder()
                   .setSubject(user.getId()
                                   .toString())
                   .setExpiration(Date.from(accessExpiredTime))
                   .signWith(accessKey)
                   .compact();
    }

    public String generateRefreshToken() {
        Instant refreshExpiredTime = Instant.now()
                                            .plus(this.refreshExpiredDay, ChronoUnit.DAYS);
        return Jwts.builder()
                   .setExpiration(Date.from(refreshExpiredTime))
                   .signWith(refreshKey)
                   .compact();
    }


    public boolean validateAccessToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(accessKey)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            throw new AuthenticationFailException("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            throw new AuthenticationFailException("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            throw new AuthenticationFailException("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            throw new AuthenticationFailException("JWT 토큰이 잘못되었습니다.");
        }
    }

    public void validateRefreshToken(String refreshToken) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(refreshKey)
                .build()
                .parseClaimsJws(refreshToken);
        } catch (Exception e) {
            throw new AuthenticationFailException("잘못된 토큰입니다.");
        }
    }


    public Long getUserIdFromExpiredAccessToken(String accessToken) {
        try {
            Claims claims = Jwts.parserBuilder()
                                .setSigningKey(accessKey)
                                .build()
                                .parseClaimsJws(accessToken)
                                .getBody();
            return Long.valueOf(claims.getSubject());
        } catch (ExpiredJwtException e) {
            return Long.valueOf(e.getClaims()
                                 .getSubject());
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            throw new AuthenticationFailException("잘못된 JWT 서명입니다.");
        } catch (Exception e) {
            e.printStackTrace();
            throw new AuthenticationFailException("지원되지 않는 JWT 토큰입니다.");
        }
    }

    public Claims getClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(accessKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
