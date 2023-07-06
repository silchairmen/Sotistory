package com.soti.sotistory.member.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class LoginResponseDto {
    private final int status;
    private final String message;

    //Constructer 자동 생성
}
