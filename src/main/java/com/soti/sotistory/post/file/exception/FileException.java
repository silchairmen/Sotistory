package com.soti.sotistory.post.file.exception;

import com.soti.sotistory.post.exception.PostErrorCode;
import lombok.Getter;

@Getter
public class FileException extends RuntimeException{

    private FileErrorCode errorCode;
    private String message;

    public FileException(FileErrorCode errorCode) {
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
    }
}
