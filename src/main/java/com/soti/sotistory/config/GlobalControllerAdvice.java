package com.soti.sotistory.config;


import com.soti.sotistory.utils.LogUtil;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice
@AllArgsConstructor
public class GlobalControllerAdvice {

    private final HttpServletRequest request;

    @ModelAttribute
    public void logging(){
        LogUtil.logInfo(request.getRequestURI(), request.getMethod());
    }
}
