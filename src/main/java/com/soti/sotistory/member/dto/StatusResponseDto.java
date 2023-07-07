package com.soti.sotistory.member.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter
public class StatusResponseDto {
    private int status;
    private String message;

    public StatusResponseDto() {
    }

    public StatusResponseDto(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
