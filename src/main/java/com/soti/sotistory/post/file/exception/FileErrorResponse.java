package com.soti.sotistory.post.file.exception;

import com.soti.sotistory.post.exception.PostErrorCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileErrorResponse {

    private int status;
    private String message;

    public FileErrorResponse(PostErrorCode postErrorCode) {
        this.status = postErrorCode.getStatus();
        this.message = postErrorCode.getMessage();
    }
}
