package com.jsix.chaekbang.global.config.webmvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jsix.chaekbang.global.util.RequestLogUtil;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
public class HttpLoggingFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper = new ObjectMapper();


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {
        HttpAccessLogDto logging = logging(request);
        log.info("{}", logging);
        filterChain.doFilter(request, response);
    }

    private HttpAccessLogDto logging(HttpServletRequest request) throws IOException {
        return HttpAccessLogDto.builder()
            .method(request.getMethod())
            .url(request.getRequestURI())
            .ip(RequestLogUtil.getIp(request))
            .build();
    }
}