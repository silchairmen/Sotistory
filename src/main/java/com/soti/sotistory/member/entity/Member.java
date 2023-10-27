package com.soti.sotistory.member.entity;

import com.soti.sotistory.member.constant.Role;
import com.soti.sotistory.member.dto.MemberDto;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Entity
@Table(name = "members")
@Builder
@Getter
@NoArgsConstructor // 매개변수가 없는 기본 생성자 추가
@AllArgsConstructor // 모든 필드를 가지는 생성자 추가
public class Member {

    //고유 id

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    //직급
    @Enumerated(EnumType.STRING)
    @Builder.Default private Role role = Role.USER;

    //마이페이지(프로필)
    @OneToOne(mappedBy = "member")
    private Profile profile;

}
