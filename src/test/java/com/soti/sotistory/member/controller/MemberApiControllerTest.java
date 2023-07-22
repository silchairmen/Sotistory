package com.soti.sotistory.member.controller;

import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.member.repository.MemberRepository;
import com.soti.sotistory.member.service.MemberAuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-test.properties")
@DisplayName("로그인 컨트롤러 테스트")
class MemberApiControllerTest {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MemberAuthService memberAuthService;

    public Member createMember(String email, String password){
        Member member = Member.builder()
                .name("테스터")
                .nickname("test")
                .stuNum("120181769")
                .joinYear("1")
                .email(email)
                .password(passwordEncoder.encode(password))
                .address("nope")
                .interests("hacking")
                .build();

        return member;
    }

    @Test
    @DisplayName("로그인 API 성공 테스트")
    void memberApiLoginSuccess() throws Exception {
        //given
        String email = "test@soti.com";
        String password = "password";

        memberAuthService.joinMember(this.createMember(email, password));

        //when //then
        mockMvc.perform(formLogin().userParameter("email")
                .loginProcessingUrl("/api/member/login")
                .user(email)
                .password(password))
                .andExpect(SecurityMockMvcResultMatchers.authenticated());
    }

    @Test
    @DisplayName("로그인 API 실패 테스트")
    void memberApiLoginError() throws Exception {
        //given
        String email = "test@soti.com";
        String password = "password";

        this.createMember(email, password);

        //when //then
        mockMvc.perform(formLogin().userParameter("email")
                        .loginProcessingUrl("/api/member/login")
                        .user(email)
                        .password("incorrect password"))
                .andExpect(SecurityMockMvcResultMatchers.unauthenticated());
    }
}