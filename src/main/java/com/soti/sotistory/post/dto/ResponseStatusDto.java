package com.soti.sotistory.post.dto;


import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ResponseStatusDto {

    private int statusCode;

    private String statusMessage;
}
