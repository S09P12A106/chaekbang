package com.jsix.chaekbang.global.config.webmvc;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000","https://www.chaekbang.xyz")
                .allowedMethods("POST", "GET", "DELETE", "PATCH", "OPTIONS")
                .allowCredentials(true);
    }

    @Bean
    HandlerMethodArgumentResolver jwtLoginUserArgumentResolver() {
        return new JwtLoginUserArgumentResolver();
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(jwtLoginUserArgumentResolver());
    }

}
