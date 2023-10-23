package com.soti.sotistory.exception;

import com.soti.sotistory.post.exception.PostErrorResponse;
import com.soti.sotistory.post.exception.PostException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({PostException.class})
    protected ResponseEntity postException(PostException e) {
        PostErrorResponse response = new PostErrorResponse(e.getErrorCode());
        return ResponseEntity.ok().body(response);
    }
}
