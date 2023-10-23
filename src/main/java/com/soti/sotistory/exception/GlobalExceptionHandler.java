package com.soti.sotistory.exception;

import com.soti.sotistory.comment.exception.CommentErrorResponse;
import com.soti.sotistory.comment.exception.CommentException;
import com.soti.sotistory.post.exception.PostErrorResponse;
import com.soti.sotistory.post.exception.PostException;
import com.soti.sotistory.post.file.exception.FileErrorResponse;
import com.soti.sotistory.post.file.exception.FileException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    //post exception
    @ExceptionHandler({PostException.class})
    protected ResponseEntity postException(PostException e) {
        PostErrorResponse response = new PostErrorResponse(e.getErrorCode());
        return ResponseEntity.ok().body(response);
    }

    //file exception
    @ExceptionHandler({FileException.class})
    protected ResponseEntity fileException(FileException e) {
        FileErrorResponse response = new FileErrorResponse(e.getErrorCode());
        return ResponseEntity.ok().body(response);
    }

    //comment exception
    @ExceptionHandler({CommentException.class})
    protected ResponseEntity commentException(CommentException e) {
        CommentErrorResponse response = new CommentErrorResponse(e.getErrorCode());
        return ResponseEntity.ok().body(response);
    }
}
