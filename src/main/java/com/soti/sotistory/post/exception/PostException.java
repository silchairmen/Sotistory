package com.soti.sotistory.post.exception;

import lombok.Getter;

@Getter
public class PostException extends RuntimeException{

    private PostErrorCode errorCode;
    private String message;

    public PostException(PostErrorCode errorCode) {
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
    }
}
