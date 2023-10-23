package com.soti.sotistory.post.file.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FileErrorCode {

    FILE_CAN_NOT_SAVE(302, "파일 저장에 실패했습니다."),
    FILE_CAN_NOT_DELETE(502, "파일 삭제에 실패했습니다.");

    private int status;
    private String message;
}
