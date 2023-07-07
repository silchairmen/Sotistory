package com.soti.sotistory.member.entity;

import com.soti.sotistory.member.constant.Role;
import com.soti.sotistory.member.dto.MemberDto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Entity
@Table(name = "members")
@Getter @Setter
@ToString
public class Member {

    //고유 id

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //이름
    private String name;

    //닉네임
    @Column(unique = true) // 닉네임은 중복이 아니여야 함
    private String nickname;

    //학번
    private String stuNum;

    //기수
    private String joinYear;

    //가입 이메일
    @Column(unique = true) //이메일을 통한 중복 제거
    private String email;

    //가입 패스워드
    private String password;

    //주소
    private String address;

    //관심 분야
    private String interests;

    //직급
    @Enumerated(EnumType.STRING)
    private Role role;

    //멤버 생성 초기 로직, 기본적으로 USER 권한을 가짐
    public static Member createMember(MemberDto memberDto, PasswordEncoder passwordEncoder){
        Member member = new Member();
        member.setName(memberDto.getName());
        member.setNickname(memberDto.getNickname());
        member.setStuNum(memberDto.getStuNum());
        member.setJoinYear(memberDto.getJoinYear());
        member.setInterests(memberDto.getInterests());
        member.setEmail(memberDto.getEmail());
        member.setAddress(memberDto.getAddress());

        String password = passwordEncoder.encode(memberDto.getPassword());

        member.setPassword(password);
        member.setRole(Role.USER);

        return member;
    }
}
