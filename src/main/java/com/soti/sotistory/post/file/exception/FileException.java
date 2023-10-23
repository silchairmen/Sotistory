package com.soti.sotistory.post.file.exception;


import com.soti.sotistory.post.exception.BaseException;
import com.soti.sotistory.post.exception.BaseExceptionType;

public class FileException extends BaseException {
    private BaseExceptionType exceptionType;


    public FileException(BaseExceptionType exceptionType) {
        this.exceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType getExceptionType() {
        return exceptionType;
    }
}
