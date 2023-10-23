package com.soti.sotistory.comment.exception;

import lombok.Getter;

@Getter
public class CommentException extends RuntimeException{

    private CommentErrorCode errorCode;
    private String message;

    public CommentException(CommentErrorCode errorCode) {
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
    }
}
