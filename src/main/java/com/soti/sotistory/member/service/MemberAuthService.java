package com.soti.sotistory.member.service;

import com.soti.sotistory.config.CustomUser;
import com.soti.sotistory.member.constant.Role;
import com.soti.sotistory.member.dto.MemberInfoDto;
import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    PasswordEncoder passwordEncoder;

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


    //이메일로 멤버 정보 가져오기
    public Member findMemberByEmail(String email){
        Member foundMember = memberRepository.findByEmail(email);

        if (foundMember == null){
            throw new IllegalStateException("유저 정보가 존재하지 않습니다.");
        }

        return foundMember;
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
