package com.soti.sotistory.member.service;

import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.member.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-test.properties")
@DisplayName("회원가입 서비스 테스트")
class MemberAuthServiceTest {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MemberAuthService memberAuthService;

    public Member createMember(String email, String password) {
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
    @DisplayName("회원가입 서비스 성공")
    void joinMember() {
        //given
        Member member = createMember("test@soti.com", "password");

        //when
        Member savedMember = memberAuthService.joinMember(member);

        //then
        Assertions.assertThat(savedMember).isEqualTo(member);
    }

    @Test
    @DisplayName("회원가입 실패 TASK 1 > 이미 존재하는 이메일로 회원가입 시 에러 발생")
    void checkEmailDuplicateMember() {
        //given
        Member member1 = createMember("test@soti.com", "password");
        Member member2 = createMember("test@soti.com", "password");

        //when
        memberAuthService.joinMember(member1);

        //then
        Throwable e = assertThrows(IllegalStateException.class,
                () -> {memberAuthService.joinMember(member2);
        });

        assertThat(e.getMessage()).isEqualTo("이미 존재하는 이메일입니다.");
    }

    @Test
    @DisplayName("회원가입 실패 TASK 2 > 이미 존재하는 닉네임으로 가입시도 시 에러 발생")
    void checkNicknameDuplicateMember() {
        //given
        Member member1 = createMember("test@soti.com", "password");
        Member member2 = createMember("test2@soti.com", "password");

        //when
        memberAuthService.joinMember(member1);

        //then
        Throwable e = assertThrows(IllegalStateException.class,
                () -> {memberAuthService.joinMember(member2);
                });

        assertThat(e.getMessage()).isEqualTo("이미 존재하는 닉네임입니다.");
    }
}