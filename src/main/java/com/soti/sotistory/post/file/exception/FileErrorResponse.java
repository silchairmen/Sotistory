package com.soti.sotistory.post.file.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileErrorResponse {

    private int status;
    private String message;

    public FileErrorResponse(FileErrorCode postErrorCode) {
        this.status = postErrorCode.getStatus();
        this.message = postErrorCode.getMessage();
    }
}
