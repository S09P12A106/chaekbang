package com.jsix.chaekbang.global.security.filter;

import com.jsix.chaekbang.domain.auth.application.jwt.JwtProvider;
import feign.Request.HttpMethod;
import io.jsonwebtoken.Claims;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String HEADER_PREFIX = "Bearer ";

    private final JwtProvider jwtProvider;

    public JwtAuthenticationFilter(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String accessJwtToken = extractToken(request);

        if (StringUtils.hasText(accessJwtToken) && jwtProvider.validateAccessToken(
                accessJwtToken)) {
            Claims claims = jwtProvider.getClaims(accessJwtToken);
            String userId = claims.getSubject();
            Authentication authentication = new UsernamePasswordAuthenticationToken(userId, "",
                    new ArrayList<>());

            // 요청 - 응답 스코프까지 살아 있는 시큐리티 세션에 저장한다.
            SecurityContextHolder.getContext()
                                 .setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        List<AntPathRequestMatcher> requestMatchers = new ArrayList<>();

        // Refresh API는 헤더에 토큰이 있지만 검사하지 않게 처리.
        requestMatchers.add(
                new AntPathRequestMatcher("/api/users/refresh", HttpMethod.POST.name()));
        return requestMatchers.stream()
                              .anyMatch(m -> m.matches(request));
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(HEADER_PREFIX)) {
            return bearerToken.substring(HEADER_PREFIX.length());
        }
        return null;
    }
}
