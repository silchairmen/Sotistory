package com.soti.sotistory.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


/**
 * 반복되는 엔티티 추가 작업 방지를 위한 클래스
 * Auditing 기능을 사용하기 위한 Configure class 이다.
 * */

@Configuration
@EnableJpaAuditing
public class AuditConfig {


    //AuditorAware을 스프링 빈으로 등록
    @Bean
    public AuditorAware<String> auditorProvider() {
        return new AuditorAwareImpl();
    }

}
