package com.soti.sotistory.post.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostErrorResponse {

    private int status;
    private String message;

    public PostErrorResponse(PostErrorCode postErrorCode) {
        this.status = postErrorCode.getStatus();
        this.message = postErrorCode.getMessage();
    }
}
