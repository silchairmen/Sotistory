package com.soti.sotistory.post.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostErrorResponse {

    private int status;
    private String message;

    public PostErrorResponse(PostErrorCode errorCode) {
        this.status = errorCode.getStatus();
        this.message = errorCode.getMessage();
    }
}
