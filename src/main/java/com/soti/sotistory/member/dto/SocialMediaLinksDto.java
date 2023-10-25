package com.soti.sotistory.member.dto;

import lombok.Getter;

@Getter
public class SocialMediaLinksDto {
    private Long id;

    private Long profileId;

    //github 주소
    private String githubAddr;

    //tistory 주소
    private String tistoryAddr;

    //dreamhack 주소
    private String dreamhackAddr;
}
