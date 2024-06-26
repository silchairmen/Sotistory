package com.soti.sotistory.member.controller;

import com.soti.sotistory.config.CustomUser;
import com.soti.sotistory.member.dto.MemberInfoDto;
import com.soti.sotistory.member.dto.MemberDto;
import com.soti.sotistory.member.dto.MemberResponseDto;
import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.member.service.MemberAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Slf4j
@RequiredArgsConstructor
public class MemberAuthController {

    //세션 검증
    @GetMapping("/validate")
    public ResponseEntity<MemberResponseDto> validateSession(){

        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String nickname = ((CustomUser) userDetails).getNickname();

            return ResponseEntity.ok().body(MemberResponseDto.builder().status(200).message(nickname).build());
        } catch (Exception e){
            return ResponseEntity.ok().body(MemberResponseDto.builder().status(203).message("세션이 유효하지 않습니다.").build());
        }
    }

    //Autowired
    private final PasswordEncoder passwordEncoder;
    private final MemberAuthService memberAuthService;

    //로그인
    @GetMapping("/login/success")
    public ResponseEntity<MemberResponseDto> memberApiLoginSuccess(){
        return ResponseEntity.ok().body(MemberResponseDto.builder().status(200).message("로그인 성공").build());
    }

    //로그인 에러 핸들링
    @GetMapping("/login/error")
    public ResponseEntity<MemberResponseDto> memberApiLoginError(){
        return ResponseEntity.ok().body(MemberResponseDto.builder().status(203).message("로그인 실패").build());
    }

    //Join 시도
    @PostMapping(value = "/join")
    public ResponseEntity<MemberResponseDto> memberJoinApi(@Valid MemberDto memberDto,
                                           BindingResult bindingResult){
        log.info("회원가입 시도 유저 -> 이메일 :{}",memberDto.getEmail());

        //파라미터 에러 검증
        if(bindingResult.hasErrors()) {
            return ResponseEntity.ok().body(MemberResponseDto.builder().status(201).message("회원 가입 매개변수 오류").build());
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
                    .build();

            memberAuthService.joinMember(member);

            log.info("회원가입 성공 " +
                    "이름 : {} / " +
                    "학번 : {} / " +
                    "이메일 : {}" ,member.getName(), member.getStuNum(), member.getEmail());

            return ResponseEntity.ok().body(MemberResponseDto.builder().status(300).message("회원 가입 성공").build());

        //로직 검증에 실패하였거나
        } catch (IllegalStateException e){

            log.error("회원가입 도중 문제 발생. / " +
                    "회원 가입 정보 : {}", memberDto.toString());

            return ResponseEntity.ok().body(MemberResponseDto.builder().status(302).message("회원 가입 정보 오류").build());
        } catch (Exception e){
            log.error("회원가입 도중 문제 발생. / " +
                    "회원 가입 정보 : {}", memberDto.toString());
            return ResponseEntity.ok().body(MemberResponseDto.builder().status(304).message("회원 가입 실패").build());
        }
    }
}
