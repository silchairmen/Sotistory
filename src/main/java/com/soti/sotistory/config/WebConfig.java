package com.soti.sotistory.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 프론트와 CORS 설정을 위한 설정 페이지
 * REST API에 필요한 HTTP METHOD CORS 해제
 * */


@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://soti.or.kr") // React 애플리케이션의 주소(클라이언트 주소)를 여기에 지정합니다.
                .allowedMethods(HttpMethod.GET.name(),
                                HttpMethod.HEAD.name(),
                                HttpMethod.POST.name(),
                                HttpMethod.PUT.name(),
                                HttpMethod.DELETE.name()
                )
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
