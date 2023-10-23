package com.soti.sotistory.post.promotional.exception;

import com.soti.sotistory.post.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;


public enum PostExceptionType implements BaseExceptionType {

    POST_NOT_POUND(700,HttpStatus.NOT_FOUND,"찾으시는 글이 없습니다."),
    NOT_AUTHORITY_UPDATE_POST(701, HttpStatus.FORBIDDEN, "글 수정 권한이 없습니다."),
    NOT_AUTHORITY_DELETE_POST(702, HttpStatus.FORBIDDEN,"글 삭제 권한이 없습니다.");

    private int errorCode;
    private HttpStatus httpStatus;
    private String errorMessage;

    PostExceptionType(int errorCode, HttpStatus httpStatus, String errorMessage){
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
        this.errorMessage = errorMessage;
    }

    @Override
    public int getErrorCode() {
        return this.errorCode;
    }

    @Override
    public HttpStatus getHttpStatus() {
        return this.httpStatus;
    }

    @Override
    public String getErrorMessage() {
        return this.errorMessage;
    }
}
