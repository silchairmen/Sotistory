package com.soti.sotistory.member.controller;

import com.soti.sotistory.member.dto.StatusResponseDto;
import com.soti.sotistory.member.dto.MemberDto;
import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.member.service.MemberAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/member")
@Slf4j
@RequiredArgsConstructor
public class MemberApiController {

    //Autowired
    private final PasswordEncoder passwordEncoder;
    private final MemberAuthService memberAuthService;

    //로그인
    @GetMapping("/login/success")
    public StatusResponseDto memberApiLoginSuccess(){
        return new StatusResponseDto(200, "Login success");
    }

    //로그인 에러 핸들링
    @GetMapping("/login/error")
    public StatusResponseDto memberApiLoginError(){
        return new StatusResponseDto(500, "아이디 혹은 비밀번호를 확인해 주세요");
    }



    //Join 시도
    @PostMapping(value = "/join")
    public StatusResponseDto memberJoinApi(@Valid MemberDto memberDto,
                                           BindingResult bindingResult){

        StatusResponseDto joinResponseDto = new StatusResponseDto();

        log.info("User Try to Join -> data={}", memberDto.toString());

        //파라미터 에러 검증
        if(bindingResult.hasErrors()){
            joinResponseDto.setStatus(403);
            joinResponseDto.setMessage(bindingResult.toString());

            return joinResponseDto;
        }


        //정상 가입일 경우 정상 응답
        try{
            Member member = Member.builder()
                    .name(memberDto.getName())
                    .nickname(memberDto.getNickname())
                    .stuNum(memberDto.getStuNum())
                    .joinYear(memberDto.getJoinYear())
                    .email(memberDto.getEmail())
                    .password(passwordEncoder.encode(memberDto.getPassword()))
                    .address(memberDto.getAddress())
                    .interests(memberDto.getInterests())
                    .build();

            memberAuthService.joinMember(member);

            joinResponseDto.setStatus(200);
            joinResponseDto.setMessage("계정 생성 완료");

            log.info("회원가입 성공\n" +
                    "이름 : {}\n" +
                    "학번 : {}\n" +
                    "이메일 : {}" ,member.getName(), member.getStuNum(), member.getEmail());

            return joinResponseDto;

        //로직 검증에 실패하였거나 db단에서 문제가 생겼을 경우
        } catch (IllegalStateException e){
            joinResponseDto.setStatus(500);
            joinResponseDto.setMessage(e.getMessage());

            log.error("회원가입 도중 문제 발생.\n" +
                    "회원 가입 정보 : {}", memberDto.toString());

            return joinResponseDto;
        }
    }
}
