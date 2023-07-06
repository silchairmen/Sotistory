package com.soti.sotistory.member.controller;

import com.soti.sotistory.member.dto.JoinResponseDto;
import com.soti.sotistory.member.dto.LoginResponseDto;
import com.soti.sotistory.member.dto.MemberDto;
import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.member.repository.MemberRepository;
import com.soti.sotistory.member.service.MemberAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
//    @PostMapping("/login")
//    public ResponseEntity<LoginResponseDto> memberLoginApi(@RequestParam String email,
//                                                           @RequestParam String password){
//
//        //로그인 검증
//        try{
//            memberAuthService.loginMember(email, password, passwordEncoder);
//        } catch (IllegalStateException e){
//
//        }
//    }



    //Join 시도
    @PostMapping(value = "/join")
    public JoinResponseDto memberJoinApi(@Valid MemberDto memberDto,
                                                         BindingResult bindingResult){

        JoinResponseDto joinResponseDto = new JoinResponseDto();

        log.info("User Try to Join -> data={}", memberDto);

        //파라미터 에러 검증
        if(bindingResult.hasErrors()){
            joinResponseDto.setStatus(403);
            joinResponseDto.setMessage(bindingResult.toString());

            return joinResponseDto;
        }


        //정상 가입일 경우 정상 응답
        try{
            Member member = Member.createMember(memberDto, passwordEncoder);
            memberAuthService.joinMember(member);

            joinResponseDto.setStatus(200);
            joinResponseDto.setMessage("계정 생성 완료");

            return joinResponseDto;

        //로직 검증에 실패하였거나 db단에서 문제가 생겼을 경우
        } catch (IllegalStateException e){
            joinResponseDto.setStatus(500);
            joinResponseDto.setMessage(e.getMessage());

            return joinResponseDto;
        }
    }
}
