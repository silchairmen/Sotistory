package com.soti.sotistory.comment.promotional.dto;

import lombok.Data;
import lombok.Getter;

import java.util.Optional;

@Data
@Getter
public class PromotionalCommentUpdateDto {

    Optional<String> content;

    public PromotionalCommentUpdateDto(Optional<String> content) {
        this.content = content;
    }

}
