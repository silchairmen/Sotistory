package com.soti.sotistory.config;

import com.soti.sotistory.member.service.MemberAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


/**
 * 스프링 시큐리티 설정 저장소
 * API 형식으로 작동하게 설계
 * 사설 코드
 *
 * 1. 조회 관련
 * 200 -> 정상 응답 -> 조회 성공
 * 201 -> 오류 응답 -> 파라미터 규격 혹은 내용 오류
 * 202 -> 오류 응답 -> 조회 도중 조회 실패
 * 203 -> 인증 에러 -> 조회 도중 인증 관련 에러
 * 204 -> 오류 응답 -> 의도치 않은 에러
 *
 * 2. 생성 관련
 * 300 -> 정상 응답 -> 생성
 * 301 -> 오류 응답 -> 생성 파라미터 규격 혹은 내용 오류
 * 302 -> 오류 응답 -> 생성 도중 생성 실패
 * 303 -> 인증 에러 -> 생성 도중 인증 관련 에러
 * 304 -> 오류 응답 -> 의도치 않은 에러
 *
 * 3. 수정 관련
 * 400 -> 정상 응답 -> 수정
 * 401 -> 오류 응답 -> 수정 파라미터 규격 혹은 내용 오류
 * 402 -> 오류 응답 -> 수정 도중 수정 실패
 * 403 -> 인증 에러 -> 수정 도중 인증 관련 에러
 * 404 -> 오류 응답 -> 의도치 않은 에러
 *
 * 4. 삭제 관련
 * 500 -> 정상 응답 -> 삭제
 * 501 -> 오류 응답 -> 삭제 파라미터 규격 혹은 내용 오류
 * 502 -> 오류 응답 -> 삭제 동중 삭제 실패
 * 503 -> 인증 에러 -> 삭제 도중 인증 관련 에러
 * 504 -> 오류 응답 -> 의도치 않은 에러
 * */


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true) //메소드 단위에서 차단 Controller 에서 지정
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    MemberAuthService memberAuthService;

    //Springboot Security method ovverride

    //    csrf 토큰 해제, 로그인 관련 보안 설정
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .formLogin()
                .loginPage("/api/auth/login")
                .usernameParameter("email")
                .failureUrl("/api/auth/login/error")
                .defaultSuccessUrl("/api/auth/login/success")
                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/api/auth/logout"))
                .logoutSuccessUrl("/")
                .deleteCookies();

        http.cors();

        //접근 권한 설정 관련
        http.authorizeRequests()
                .antMatchers("/api/member/info/**", "/api/member/profile/**").authenticated()
                .antMatchers("/admin").hasRole("ADMIN");// 마이페이지 접근은 인증된 사용자만 가능
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