package com.soti.sotistory.member.dto;


import com.soti.sotistory.member.entity.Profile;
import com.soti.sotistory.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberInfoProfileDto {

    private String nickname;

    private String joinYear;

    //이력, 이력 또한 따로 테이블 관리 하는게 아닌 String으로 저장
    private String awards;

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

    //동아리 내 직위
    private String position;


    //프로필을 업데이트한 사람의 경우
    public MemberInfoProfileDto(Member member, Profile profile){
        this.nickname = member.getNickname();
        this.joinYear = member.getJoinYear();
        this.awards = profile.getAwards();
        this.skills = profile.getSkills();
        this.githubAddr = profile.getGithubAddr();
        this.dreamhackAddr = profile.getDreamhackAddr();
        this.tistoryAddr = profile.getTistoryAddr();
        this.profileImageName = profile.getProfileImageName();
        this.position = profile.getPosition();
    }

    //프로필을 업데이트 하지 않은 사람의 경우
    public MemberInfoProfileDto(Member member){
        this.nickname = member.getNickname();
        this.joinYear = member.getJoinYear();
    }
}
