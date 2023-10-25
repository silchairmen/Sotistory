package com.soti.sotistory.member.service;

import com.soti.sotistory.member.constant.Role;
import com.soti.sotistory.member.repository.MemberRepository;
import com.soti.sotistory.member.repository.ProfileRepository;
import com.soti.sotistory.member.dto.MemberInfoDto;
import com.soti.sotistory.member.dto.MemberProfileDto;
import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.member.entity.Profile;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Transactional
public class MemberInfoService {

    private final MemberRepository memberRepository;
    private final ProfileRepository profileRepository;
    private final MemberAuthService memberAuthService;
    PasswordEncoder passwordEncoder;

    //유저 정보 수정
    public void changeMemberInfo(MemberInfoDto memberDto) {
        Member foundMember = memberRepository.findByEmail(memberDto.getEmail());

        if (foundMember == null) {
            throw new IllegalStateException("유저 정보가 존재하지 않습니다");
        }

        //바뀐 정보를 저장할 객체 생성
        Member member;

        //패스워드 변동이 없을 경우
        if (memberDto.getPassword() == null) {

            member = Member.builder()
                    .id(foundMember.getId())                        // 아이디 -> 변동 불가
                    .email(foundMember.getEmail())                  // 이메일 -> 변동 불가 foundmember에서 가져옴
                    .name(memberDto.getName())
                    .nickname(memberDto.getNickname())
                    .password(foundMember.getPassword())            // 비밀번호 -> 변경 안됨
                    .stuNum(memberDto.getStuNum())
                    .role(foundMember.getRole())                    // 인가 -> 변동 불가
                    .address(memberDto.getAddress())
                    .joinYear(memberDto.getJoinYear()).build();

            //패스워드 변동이 있을 경우
        } else {
            member = Member.builder()
                    .id(foundMember.getId())                        //아이디 -> 변동 불가
                    .email(foundMember.getEmail())                  //이메일 -> 변동 불가 foundmember에서 가져옴
                    .name(memberDto.getName())                      //이름
                    .nickname(memberDto.getNickname())
                    .password(passwordEncoder.encode(memberDto.getPassword())) //비밀번호 변동 시 암호화 해서 저장
                    .stuNum(memberDto.getStuNum())                  //학번
                    .role(foundMember.getRole())                    // 권한 -> 변동 불가
                    .address(memberDto.getAddress())
                    .joinYear(memberDto.getJoinYear()).build();
        }

        //닉네임이 바뀌었다면 닉네임 중복확인
        if (!memberDto.getNickname().equals(foundMember.getNickname())){
            memberAuthService.checkNicknameDuplicateMember(member);
        }

        memberRepository.save(member);
    }


    //유저 권한으로 조회해서 반환
    public List<Member> findUsers(Role role){
        return memberRepository.findByRole(role);
    }

    //유저 고유 id로 profile 찾기, getProfile하면 왠진 모르겠는데 stackoverflow 발생
    public Profile findProfile(Long memberId){return profileRepository.findByMemberId(memberId); }

    //멤버 프로필 등록, 수정
    //@Todo 나중에 이거 is_present로 바꿔야함, 현재는 db 트랜잭션이 매우 많이 일어남
    public void saveProfile(MultipartFile uploadFile, MemberProfileDto profileDto, String email) throws IOException {

        // 업로드 디렉토리 경로
        String uploadDirectory = "C:\\uploads\\";

        /*  멤버 조회 로직 */
        //업로드한 유저 확인
        Member member = memberAuthService.findMemberByEmail(email);

        //멤버와 연결된 프로파일 가져오기
        Profile profile = findProfile(member.getId());

        //신규 프로필
        Profile newProfile;

        //파일 업로드 유무 확인
        if (uploadFile == null) {

            //프로필이 존재하지 않고, 프로필 사진 업로드를 안할 않을 경우 유저 정보 생성
            if (profile == null) {
                newProfile = Profile.builder()
                        .skills(profileDto.getSkills())
                        .awards(profileDto.getAwards())
                        .position(profileDto.getPosition())
                        .member(member)
                        .dreamhackAddr(profileDto.getDreamhackAddr())
                        .githubAddr(profileDto.getGithubAddr())
                        .tistoryAddr(profileDto.getTistoryAddr())
                        .profileImageName("default_profile.jpg").build();
            }
            else {
                // 파일업로드가 없는 상태에서 멤버 정보를 수정할 경우
                profile.setSkills(profileDto.getSkills());
                profile.setAwards(profileDto.getAwards());
                profile.setPosition(profileDto.getPosition());
                profile.setMember(member);
                profile.setDreamhackAddr(profileDto.getDreamhackAddr());
                profile.setGithubAddr(profileDto.getGithubAddr());
                profile.setTistoryAddr(profileDto.getTistoryAddr());
                profile.setProfileImageName(profile.getProfileImageName()); //기존 프로필 주소 사용

                newProfile = profile;
            }

            profileRepository.save(newProfile);
        }
        //파일 업로드가 존재할 경우
        else {
            /*  파일 처리 로직 */
            // 파일 이름 추출
            String originalFilename = uploadFile.getOriginalFilename();

            // 랜덤 UUID 생성
            String uuid = UUID.randomUUID().toString();

            // 확장자 추출
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));

            // 저장할 파일 이름
            String saveFileName = uuid + extension;

            // 저장할 경로
            String filePath = uploadDirectory + saveFileName;

            //프로필이 조회되지 않은 경우 기존 파일을 삭제하지 않고, 신규 등록함
            if ( profile == null) {
                try{
                    //신규 파일 생성 및 이동
                    File dest = new File(filePath);
                    uploadFile.transferTo(dest);
                } catch (IOException e){
                    throw new IOException();
                }

                // 프로필 이미지 파일 이름 설정
                profileDto.setProfileImageName(saveFileName);

                // 추가 정보 입력
                profileDto.setMemberProfile(profileDto);


                // 프로필 정보 업데이트
                newProfile = Profile.builder()
                        .skills(profileDto.getSkills())
                        .awards(profileDto.getAwards())
                        .position(profileDto.getPosition())
                        .member(member)
                        .dreamhackAddr(profileDto.getDreamhackAddr())
                        .githubAddr(profileDto.getGithubAddr())
                        .tistoryAddr(profileDto.getTistoryAddr())
                        .profileImageName(saveFileName).build();

                profileRepository.save(newProfile);
            }

            //프로필이 있다면 기존에 있던 프로필 이미지 삭제. 대신, 디폴트 프로필이면 삭제 안함
            else {
                //이전 이미지 가져옴
                String oldProfile = uploadDirectory + File.separator + profile.getProfileImageName();

                //디폴트면 무시
                if (oldProfile.contains("default_profile")) {
                }

                //디폴트가 아니고 파일이 존재하면 삭제
                else if (StringUtils.hasText(oldProfile)) {
                    File existingFile = new File(oldProfile);
                    existingFile.delete();
                }

                try{
                    //신규 파일 생성 및 이동
                    File dest = new File(filePath);
                    uploadFile.transferTo(dest);
                } catch (IOException e){
                    throw new IOException();
                }

                // 프로필 이미지 파일 이름 설정
                profileDto.setProfileImageName(saveFileName);

                // 추가 정보 입력
                profileDto.setMemberProfile(profileDto);

                // 프로필 정보 업데이트
                profile.setSkills(profileDto.getSkills());
                profile.setAwards(profileDto.getAwards());
                profile.setPosition(profileDto.getPosition());
                profile.setMember(member);
                profile.setDreamhackAddr(profileDto.getDreamhackAddr());
                profile.setGithubAddr(profileDto.getGithubAddr());
                profile.setTistoryAddr(profileDto.getTistoryAddr());
                profile.setProfileImageName(saveFileName); //신규 생성 파일

                newProfile = profile;

                profileRepository.save(newProfile);
            }
        }
    }

}
