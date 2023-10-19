package com.soti.sotistory.member.controller;

import com.soti.sotistory.config.CustomUser;
import com.soti.sotistory.member.constant.Role;
import com.soti.sotistory.member.dto.MemberInfoDto;
import com.soti.sotistory.member.dto.MemberInfoProfileDto;
import com.soti.sotistory.member.dto.MemberProfileDto;
import com.soti.sotistory.member.dto.MemberResponseDto;
import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.member.entity.Profile;
import com.soti.sotistory.member.service.MemberAuthService;
import com.soti.sotistory.member.service.MemberInfoService;
import com.soti.sotistory.post.exception.MemberNotFoundException;
import com.soti.sotistory.post.exception.ProfileNotFoundException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/member/")
@Slf4j
@RequiredArgsConstructor
public class MemberInfoController {

    private final MemberAuthService memberAuthService;
    private final MemberInfoService memberInfoService;


    @GetMapping("/info")
    public ResponseEntity<MemberResponseDto> myInfoPage(){

        //이메일로 유저 조회
        try{

            //세션검증, 이메일 추출
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String email = ((CustomUser) userDetails).getUsername();

            //멤버 찾기
            Member foundMember = memberAuthService.findMemberByEmail(email);
            MemberResponseDto mrDto = MemberResponseDto.builder().status(200).message("멤버 조회 성공").build();
            mrDto.setMemberInfo(foundMember);

            return ResponseEntity.ok().body(mrDto);

        } catch (IllegalStateException ex){
            return ResponseEntity.ok().body(MemberResponseDto.builder().status(203).message("유저 권한 없음").build());

        } catch (Exception ex){

            log.error("마이페이지 에러 발생 : {}", ex.getMessage());
            return ResponseEntity.ok().body(MemberResponseDto.builder().status(204).message("유저 조회 실패").build());

        }
    }

    //마이페이지 수정
    @PutMapping("/info/edit")
    public ResponseEntity<MemberResponseDto> myPageEdit(@Valid MemberInfoDto memberDto) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = ((CustomUser) userDetails).getUsername();

        if (email.equals(memberDto.getEmail())){
            try {

                memberInfoService.changeMemberInfo(memberDto);
                MemberResponseDto mrDto = MemberResponseDto.builder().status(400).message("멤버 수정 성공").build();
                return ResponseEntity.ok().body(mrDto);

            } catch (IllegalStateException ex) {

                MemberResponseDto mrDto = MemberResponseDto.builder().status(402).message("수정 정보 오류").build();
                return ResponseEntity.ok().body(mrDto);

            } catch (Exception ex){

                MemberResponseDto mrDto = MemberResponseDto.builder().status(404).message("멤버 수정 실패").build();
                return ResponseEntity.ok().body(mrDto);

            }
        } else{
            return ResponseEntity.ok().body(MemberResponseDto.builder().status(403).message("멤버 인증 실패").build());
        }
    }


    //모든 멤버 프로필 조회
    @GetMapping("/all")
    public ResponseEntity<MemberResponseDto> getAllMemberProfile(){

        List<MemberInfoProfileDto> allMemberProfile = new ArrayList<>();
        List<Member> members = memberInfoService.findUsers(Role.USER);

        for ( Member member : members) {
            Profile profile = member.getProfile();

            //유저 계정 정보에서 필수정보만 추출, 프로필이랑 merge해서 return
            MemberInfoProfileDto memberInfoProfileDto;


            //프로필이 있는 사람의 경우
            if (profile != null){
                memberInfoProfileDto = new MemberInfoProfileDto(member, profile);
            }

            //프로필이 없는 사람의 경우
            else{
                memberInfoProfileDto = new MemberInfoProfileDto(member);
            }

            allMemberProfile.add(memberInfoProfileDto);
        }

        MemberResponseDto mrDto = MemberResponseDto.builder().status(200).message("조회 성공").build();
        mrDto.setAllMemberInfoProfileDto(allMemberProfile);

        return ResponseEntity.ok(mrDto);
    }


    //프로필 수정
    @PutMapping("/profile/edit")
    public ResponseEntity<MemberResponseDto> editProfile(@RequestParam(value = "profileImg", required = false) MultipartFile file,
                                                         MemberProfileDto profileDto) {

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = ((CustomUser) userDetails).getUsername();

        //파일 업로드를 수행하지 않은 경우
        if (file == null) {
            log.info("프로파일 없음");
        }
        //파일 업로드를 수행한 경우
        //간단한 보안 로직 : 확장자, content type 검사
        else {
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            if (!extension.equals(".jpeg") && !extension.equals(".jpg")) {
                return ResponseEntity.badRequest().body(MemberResponseDto.builder().status(400).message("JPEG 파일만 업로드 가능합니다").build());
            }

            // 파일 MIME 유형 확인
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image")) {
                return ResponseEntity.badRequest().body(MemberResponseDto.builder().status(400).message("이미지 파일만 업로드 가능합니다").build());

            }
        }

        // 프로필 수정 시도
        try{
            memberInfoService.saveProfile(file, profileDto, email);
        } catch (IOException e){
            return ResponseEntity.badRequest().body(MemberResponseDto.builder().status(402).message("프로파일 수정 실패").build());
        }

        //문제가 없다면 400을 리턴
        return ResponseEntity.badRequest().body(MemberResponseDto.builder().status(400).message("수정 성공").build());
    }

    @GetMapping("/profile")
    public ResponseEntity<MemberResponseDto> getProfile(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = ((CustomUser) userDetails).getUsername();

        MemberResponseDto mrDto;

        try{
            Member member = memberAuthService.findMemberByEmail(email);
            Profile profile = memberInfoService.findProfile(member.getId());

            if ( member == null){
                throw new MemberNotFoundException("멤버 정보가 존재하지 않습니다.");

            } else if (profile == null) {
                throw new ProfileNotFoundException("프로필 정보가 존재하지 않습니다.");

            } else{
                //프로파일 convert
                MemberProfileDto memberProfileDto= new MemberProfileDto();
                memberProfileDto.convertProfileToDto(profile);
                //메세지로 가공
                mrDto = MemberResponseDto.builder().status(200).message("조회 성공").build();
                mrDto.setMemberProfileDto(memberProfileDto);
            }

        //멤버 혹은 프로필을 찾지 못하였을 경우
        } catch (MemberNotFoundException | ProfileNotFoundException me){
            log.info(me.getMessage());
            mrDto = MemberResponseDto.builder().status(202).message(me.getMessage()).build();

        } catch (Exception e){
            log.info(e.getMessage());
            mrDto = MemberResponseDto.builder().status(202).message("의도치 않은 에러 발생").build();
        }

        return ResponseEntity.ok().body(mrDto);
    }
}
