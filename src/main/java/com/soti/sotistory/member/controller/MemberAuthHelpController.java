package com.soti.sotistory.member.controller;


import com.soti.sotistory.member.dto.MemberResponseDto;
import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.member.service.MemberAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/help")
public class MemberAuthHelpController {

    //Autowired
    private final MemberAuthService memberAuthService;


    //이메일 검증 로직
    @PostMapping(value = "/check_email")
    public ResponseEntity<MemberResponseDto> checkEmail(@RequestParam(name = "email") String email){
        Member member = Member.builder()
                        .email(email)
                        .build();


        try{
            memberAuthService.checkEmailDuplicateMember(member);
            return ResponseEntity.ok().body(MemberResponseDto.builder().status(200).message("이메일 사용 가능").build());

        }catch (IllegalStateException e){
            return ResponseEntity.ok().body(MemberResponseDto.builder().status(202).message("이메일이 중복됩니다.").build());

        }catch (Exception e){
            return ResponseEntity.ok().body(MemberResponseDto.builder().status(204).message("이메일 조회 실패").build());
        }

    }

    //닉네임 검증 로직
    @PostMapping(value = "/check_nickname")
    public ResponseEntity<MemberResponseDto> checkNickname(@RequestParam(name = "nickname") String nickName){
        Member member = Member.builder()
                .nickname(nickName).build();


        try{
            memberAuthService.checkNicknameDuplicateMember(member);
            return ResponseEntity.ok().body(MemberResponseDto.builder().status(200).message("닉네임 사용 가능").build());

        }catch (IllegalStateException e){
            return ResponseEntity.ok().body(MemberResponseDto.builder().status(202).message("닉네임이 중복됩니다.").build());

        }catch (Exception e){
            return ResponseEntity.ok().body(MemberResponseDto.builder().status(204).message("닉네임 조회 실패").build());
        }

    }

    //아이디 찾기



    //비밀번호 찾기
}
