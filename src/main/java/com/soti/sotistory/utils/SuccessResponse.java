package com.soti.sotistory.utils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SuccessResponse {

    private int status;
    private String message;

    public SuccessResponse(String message) {
        this.status = 200;
        this.message = message;
    }
}
