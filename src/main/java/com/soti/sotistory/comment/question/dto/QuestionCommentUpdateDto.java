package com.soti.sotistory.comment.question.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Optional;

@Data
@AllArgsConstructor
public class QuestionCommentUpdateDto {

    private Optional<String> content;

}
