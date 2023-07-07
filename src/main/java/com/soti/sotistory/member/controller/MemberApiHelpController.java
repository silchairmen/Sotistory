package com.soti.sotistory.member.controller;


import com.soti.sotistory.member.dto.MemberDto;
import com.soti.sotistory.member.dto.StatusResponseDto;
import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.member.service.MemberAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member/help")
public class MemberApiHelpController {

    //Autowired
    private final MemberAuthService memberAuthService;


    //이메일 검증 로직
    @PostMapping(value = "/check_email")
    public StatusResponseDto checkEmail(@RequestParam(name = "email") String email){
        Member member = new Member();
        member.setEmail(email);


        try{
            memberAuthService.checkEmailDuplicateMember(member);
            return new StatusResponseDto(200, "Not Duplicated");

        }catch (IllegalStateException e){

            return new StatusResponseDto(500, "Email Duplicated");
        }

    }

    //닉네임 검증 로직
    @PostMapping(value = "/check_nickname")
    public StatusResponseDto checkNickname(@RequestParam(name = "nickname") String nickName){
        Member member = new Member();
        member.setNickname(nickName);

        try{
            memberAuthService.checkNicknameDuplicateMember(member);
            return new StatusResponseDto(200, "Not Duplicated");

        }catch (IllegalStateException e){
            return new StatusResponseDto(500, "nickName Duplicated");
        }

    }

    //아이디 찾기



    //비밀번호 찾기
}
