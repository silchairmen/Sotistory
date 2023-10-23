package com.soti.sotistory.comment.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentErrorResponse {

    private int status;
    private String message;

    public CommentErrorResponse(CommentErrorCode errorCode) {
        this.status = errorCode.getStatus();
        this.message = errorCode.getMessage();
    }
}
