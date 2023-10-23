package com.soti.sotistory.comment.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CommentErrorCode {

    NOT_POUND_COMMENT(201, "찾으시는 댓글이 없습니다"),
    NOT_AUTHORITY_UPDATE_COMMENT(403, "댓글을 업데이트할 권한이 없습니다."),
    NOT_AUTHORITY_DELETE_COMMENT(503, "댓글을 삭제할 권한이 없습니다.");

    private int status;
    private String message;
}
