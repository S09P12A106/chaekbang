package com.jsix.chaekbang.global.security;


import com.jsix.chaekbang.domain.auth.application.jwt.JwtProvider;
import com.jsix.chaekbang.global.security.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtProvider jwtProvider;

    @Bean
    AuthenticationEntryPoint authenticationEntryPoint() {
        return new CustomAuthenticationEntryPoint();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // rest API , crsf 사용 X
        http.csrf()
            .disable();

        // 시큐리티 기본 login 방식 사용 X
        http.formLogin()
            .disable();

        // 세션 사용 X, 인증 실패시 entriyPoint로 이동된다.
        http.exceptionHandling()
            .authenticationEntryPoint(authenticationEntryPoint())
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.cors()
            .and()
            .authorizeRequests()
            .antMatchers("/")
            .permitAll()
            .antMatchers(HttpMethod.POST, "/api/users/sign-in", "/api/users", "/api/users/refresh",
                    "/api/users/dev/sign-in", "/api/dev/oauth")
            .permitAll()
            .antMatchers(HttpMethod.GET, "/api/groups/recommended", "/api/groups/popular",
                    "/api/tags/popular", "/api/groups/search*", "/api/groups/{group_id}")
            .permitAll()
            .anyRequest()
            .authenticated();
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtProvider);
    }
}
