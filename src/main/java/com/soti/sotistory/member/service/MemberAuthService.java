package com.soti.sotistory.member.service;

import com.soti.sotistory.config.CustomUser;
import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/*
* 기본적으로 생성자 주입, Transactional을 사용한 에러 핸들링
* */
@RequiredArgsConstructor
@Service
@Transactional
public class MemberAuthService implements UserDetailsService {

    private final MemberRepository memberRepository;


//    //login method
//    // 로그인 메서드
//    public Member loginMember(String email, String password, PasswordEncoder passwordEncoder) {
//        Member member = memberRepository.findByEmail(email);
//        if (member == null || !member.getPassword().equals(passwordEncoder.encode(password))) {
//            throw new IllegalArgumentException("이메일 혹은 비밀번호가 틀렸습니다.");
//        }
//
//        return member;
//    }


    //join method
    public Member joinMember(Member member) {
        checkEmailDuplicateMember(member);
        checkNicknameDuplicateMember(member);
        return memberRepository.save(member);
    }

    public void checkEmailDuplicateMember(Member member){
        Member findMember = memberRepository.findByEmail(member.getEmail());
        if(findMember != null){
            throw new IllegalStateException("이미 존재하는 이메일입니다.");
        }
    }

    public void checkNicknameDuplicateMember(Member member){
        Member findMember = memberRepository.findByNickname(member.getNickname());
        if(findMember != null){
            throw new IllegalStateException("이미 존재하는 닉네임입니다.");
        }
    }


    //로그인 로직 관련
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email);

        //유저가 없다면 email로 UsernameNotFoundException을 날림
        if (member == null) {
            throw new UsernameNotFoundException(email);
        }

        //유저정보에 이메일과 password, role을 넣어서 념겨줌, role은 Spring Security에서 필요한 부분임.
        return new CustomUser(
                member.getEmail(),
                member.getPassword(),
                AuthorityUtils.createAuthorityList(member.getRole().toString()),
                member.getNickname());
    }
}
