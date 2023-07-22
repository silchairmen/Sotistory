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

    /**
     * @param status : 상태 200, 403, 500
     * @param message : 메세지 타입 (200-> 서버측 검증 성공 로직에 따른 메세지 설정
     *                              403 -> 허용되지 않은 메서드
     *                              500 -> db처리 중 에러
     */
    public StatusResponseDto(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
