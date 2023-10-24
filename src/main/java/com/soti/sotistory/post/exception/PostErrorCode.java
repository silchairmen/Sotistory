package com.soti.sotistory.post.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PostErrorCode {

    POST_NOT_FOUND(201,"글을 찾을 수 없습니다."),
    NOT_AUTHORITY_UPDATE_POST(403, "글 수정 권한이 없습니다."),
    NOT_AUTHORITY_DELETE_POST(503ㄴ, "글 삭제 권한이 없습니다.");

    private int status;
    private String message;
}
