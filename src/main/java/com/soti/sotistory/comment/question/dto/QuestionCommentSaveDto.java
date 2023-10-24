package com.soti.sotistory.comment.question.dto;

import com.soti.sotistory.comment.question.entity.QuestionComment;
import com.soti.sotistory.comment.question.repository.QuestionCommentRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class QuestionCommentSaveDto {

    @NotBlank
    private String content;

    public QuestionComment toEntity() {
        return QuestionComment.builder().content(content).build();
    }
}
