package com.soti.sotistory.exception;

import com.soti.sotistory.comment.exception.CommentErrorResponse;
import com.soti.sotistory.comment.exception.CommentException;
import com.soti.sotistory.post.exception.PostErrorResponse;
import com.soti.sotistory.post.exception.PostException;
import com.soti.sotistory.post.file.exception.FileErrorResponse;
import com.soti.sotistory.post.file.exception.FileException;
import com.soti.sotistory.utils.LogUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestControllerAdvice
@AllArgsConstructor
public class GlobalExceptionHandler {

    private final HttpServletRequest request;

    //post exception
    @ExceptionHandler({PostException.class})
    protected ResponseEntity postException(PostException e) {
        PostErrorResponse response = new PostErrorResponse(e.getErrorCode());
        log.warn("postException({}) -> {}",response.getStatus(),response.getMessage());
        return ResponseEntity.ok().body(response);
    }

    //file exception
    @ExceptionHandler({FileException.class})
    protected ResponseEntity fileException(FileException e) {
        FileErrorResponse response = new FileErrorResponse(e.getErrorCode());
        log.warn("fileException({}) -> {}",response.getStatus(),response.getMessage());
        return ResponseEntity.ok().body(response);
    }

    //comment exception
    @ExceptionHandler({CommentException.class})
    protected ResponseEntity commentException(CommentException e) {
        CommentErrorResponse response = new CommentErrorResponse(e.getErrorCode());
        log.warn("commentException({}) -> {}",response.getStatus(),response.getMessage());
        return ResponseEntity.ok().body(response);
    }

    //logging controllerAdvice를 선언한 class가 두개 일때 문제가 생길 수 있음
    @ModelAttribute
    public void logging(){
        LogUtil.logInfo(request.getRequestURI(), request.getMethod());
    }
}
