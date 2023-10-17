package com.soti.sotistory.member.entity;


import com.soti.sotistory.member.constant.Role;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "profile")
@Builder
@Getter
@NoArgsConstructor // 매개변수가 없는 기본 생성자 추가
@AllArgsConstructor // 모든 필드를 가지는 생성자 추가
@ToString
public class Profile {

    @Id
    @Column(name = "profile_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "member_id")
    private Long memberId;

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
    @Builder.Default private Role role = Role.USER;

}
