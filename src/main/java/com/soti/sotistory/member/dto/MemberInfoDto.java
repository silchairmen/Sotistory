package com.soti.sotistory.member.dto;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Getter
@Setter
public class MemberInfoDto {
    //이름
    @NotBlank(message = "이름은 필수 입력 항목입니다.")
    private String name;

    //닉네임
    @NotEmpty(message = "닉네임은 필수 입력 항목입니다.")
    @Length(min = 3,max = 20,message = "닉네임은 최소 3글자, 최대 20글자입니다.")
    private String nickname;

    //학번
    @NotEmpty(message = "학번은 필수 입력 항목입니다.")
    @Length(min = 9,max = 9,message = "학번은 9글자 입니다..")
    @Pattern(regexp = "^[0-9]+$", message = "숫자만 입력해주세요.")
    private String stuNum;

    //기수
    @NotEmpty(message = "기수는 필수 입력 항목입니다.")
    @Pattern(regexp = "^[0-9]+$", message = "숫자만 입력해주세요.")
    private String joinYear;

    //가입 이메일
    @NotEmpty(message = "이메일은 필수 입력 항목입니다.")
    @Email(message = "이메일 형식으로 입력해주세요.")
    private String email;

    //가입 패스워드
    @Length(min = 8,message = "패스워드는 최소 8글자 입니다.")
    private String password;

    //주소
    private String address;

    //관심 분야
    private String interests;
}
