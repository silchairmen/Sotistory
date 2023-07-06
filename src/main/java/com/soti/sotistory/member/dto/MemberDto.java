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
public class MemberDto {
    /*

    @NotBlank와 @NotEmpty는 Hibernate Validator 라이브러리에서 제공하는 어노테이션으로, 둘 다 필드 값이 비어있는지 여부를 검증하는데 사용됩니다. 그러나 두 어노테이션은 약간의 차이가 있습니다.
    @NotBlank: 해당 필드 값이 null이 아니고, 또는 공백 문자로만 이루어져 있지 않은지를 확인합니다. 즉, 문자열의 공백 여부만을 검증하는 것이 아니라 문자열이 비어있지 않은지도 확인합니다. 따라서 null, ""(빈 문자열), " "(공백 문자열)과 같은 값은 허용되지 않습니다.
    @NotEmpty: 해당 필드 값이 null이 아니고, 또는 빈 문자열이 아닌지를 확인합니다. 즉, 문자열의 비어있음 여부만을 검증합니다. 공백 문자열(" ")은 허용됩니다.
    따라서, @NotBlank는 문자열이 공백으로만 이루어져 있지 않고, @NotEmpty는 문자열이 빈 문자열이 아닌지를 확인합니다.
    * */

    //이름
    @NotBlank(message = "이름은 필수 입력 항목입니다.")
    private String name;

    //닉네임
    @NotEmpty(message = "닉네임은 필수 입력 항목입니다.")
    @Length(min = 4,max = 20,message = "닉네임은 최소 4글자, 최대 20글자입니다.")
    private String nickname;

    //학번
    @NotEmpty(message = "학번은 필수 입력 항목입니다.")
    @Length(min = 9,max = 9,message = "학번은 12글자 입니다..")
    @Pattern(regexp = "^[0-9]+$", message = "숫자만 입력해주세요.")
    private String stunum;

    //기수
    @NotEmpty(message = "기수는 필수 입력 항목입니다.")
    @Pattern(regexp = "^[0-9]+$", message = "숫자만 입력해주세요.")
    private String joinyear;

    //가입 이메일
    @NotEmpty(message = "이메일은 필수 입력 항목입니다.")
    @Email(message = "이메일 형식으로 입력해주세요.")
    private String email;

    //가입 패스워드
    @NotEmpty(message = "패스워드는 필수 입력 항목입니다.")
    @Length(min = 4,message = "패스워드는 최소 8글자 입니다.")
    private String password;

    //주소
    private String address;

    //관심 분야
    private String interests;
}
