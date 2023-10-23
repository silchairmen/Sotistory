package com.soti.sotistory.comment.dto;

import com.soti.sotistory.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class CommentSaveDto {

    @NotBlank(message = "내용을 입력해주세요")
    private String content;


    public Comment toEntity() {
        return Comment.builder().content(content).build();
    }
}
