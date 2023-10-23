package com.soti.sotistory.post.promotional.exception;


import com.soti.sotistory.post.exception.BaseException;
import com.soti.sotistory.post.exception.BaseExceptionType;

public class PostException extends BaseException {


    private BaseExceptionType baseExceptionType;

    public PostException(BaseExceptionType baseExceptionType){
        this.baseExceptionType = baseExceptionType;
    }

    @Override
    public BaseExceptionType getExceptionType() {
        return this.baseExceptionType;
    }
}
