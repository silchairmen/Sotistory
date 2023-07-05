package com.soti.sotistory.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDto {

    //이름
    private String name;

    //닉네임
    private String nickname;

    //학번
    private String stuNum;

    //기수
    private String joinYear;

    //가입 이메일
    private String email;

    //가입 패스워드
    private String password;

    //주소
    private String address;

    //관심 분야
    private String interests;
}
