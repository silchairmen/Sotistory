package com.soti.sotistory.comment.promotional.dto;

import com.soti.sotistory.comment.promotional.entity.PromotionalComment;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class PromotionalCommentSaveDto {

    @NotBlank
    private String content;

    public PromotionalComment toEntity() {
        return PromotionalComment.builder().content(content).build();
    }
}
