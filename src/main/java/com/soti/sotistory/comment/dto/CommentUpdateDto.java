package com.soti.sotistory.comment.dto;

import lombok.Data;
import lombok.Getter;

import java.util.Optional;

@Data
@Getter
public class CommentUpdateDto {

    Optional<String> content;

    public CommentUpdateDto(Optional<String> content) {
        this.content = content;
    }

}
