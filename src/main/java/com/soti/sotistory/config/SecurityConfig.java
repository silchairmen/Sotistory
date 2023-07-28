package com.soti.sotistory.config;

import com.soti.sotistory.member.service.MemberAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.util.Collection;


/**
 * 스프링 시큐리티 설정 저장소
 * API 형식으로 작동하게 설계
 * */


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    MemberAuthService memberAuthService;

    //Springboot Security method ovverride

    //    csrf 토큰 해제, 로그인 관련 보안 설정
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .formLogin()
                .loginPage("/api/member/login")
                .usernameParameter("email")
                .failureUrl("/api/member/login/error")
                .defaultSuccessUrl("/api/member/login/success")
                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/api/members/logout"))
                .logoutSuccessUrl("/")
                .deleteCookies();

        http.cors();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(memberAuthService).passwordEncoder(passwordEncoder());
    }
}