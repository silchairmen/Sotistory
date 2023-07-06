package com.soti.sotistory.member.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter @Setter
public class JoinResponseDto {
    private int status;
    private String message;
}
