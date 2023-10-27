package com.soti.sotistory.member.dto;

import com.soti.sotistory.member.entity.Profile;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberProfileDto {

//    private Long id;
//
//    private MemberDto memberDto;

    //이력, 이력 또한 따로 테이블 관리 하는게 아닌 String으로 저장
    private String awards;

    //블로그, 깃헙 주소
    //github 주소
    private String githubAddr;

    //tistory 주소
    private String tistoryAddr;

    //dreamhack 주소
    private String dreamhackAddr;

    //스킬셋 / "." 으로 split 하여 구분할 예정이기 때문에 String으로 저장
    //ex) java.python.spring
    private String skills;

    //프로필 이미지
    private String profileImageName;

    //역할
    private String position;

    public void setMemberProfile(MemberProfileDto profile){
        this.awards = profile.getAwards();
        this.githubAddr = profile.getGithubAddr();
        this.dreamhackAddr = profile.getDreamhackAddr();
        this.tistoryAddr = profile.getTistoryAddr();
        this.skills = profile.getSkills();
        this.profileImageName = profile.getProfileImageName();
        this.position = profile.getPosition();
    }

    public void convertProfileToDto(Profile profile){
        this.awards = profile.getAwards();
        this.githubAddr = profile.getGithubAddr();
        this.dreamhackAddr = profile.getDreamhackAddr();
        this.tistoryAddr = profile.getTistoryAddr();
        this.skills = profile.getSkills();
        this.profileImageName = profile.getProfileImageName();
        this.position = profile.getPosition();
    }
}
