package com.soti.sotistory.member.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.soti.sotistory.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter @Builder
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class MemberResponseDto {

    private int status;

    private String message;

    MemberDto memberInfo;

    List<MemberInfoProfileDto> allMemberInfo;

    MemberProfileDto memberProfileDto;

    public void setMemberInfo(Member member){
        memberInfo = new MemberDto();
        this.memberInfo.setEmail(member.getEmail());
        this.memberInfo.setNickname(member.getNickname());
        this.memberInfo.setName(member.getName());
        this.memberInfo.setJoinYear(member.getJoinYear());
        this.memberInfo.setStuNum(member.getStuNum());
        this.memberInfo.setAddress(member.getAddress());
    }

    public void setAllMemberInfoProfileDto(List<MemberInfoProfileDto> memberInfoProfileDto){
        this.allMemberInfo = memberInfoProfileDto;
    }

    public void setMemberProfileDto(MemberProfileDto memberProfileDto){
        this.memberProfileDto = memberProfileDto;
    }
}
