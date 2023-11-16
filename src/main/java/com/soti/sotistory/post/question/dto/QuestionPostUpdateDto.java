package com.soti.sotistory.post.question.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Optional;

@Data
@AllArgsConstructor
public class QuestionPostUpdateDto {

    private Optional<String> title;
    private Optional<String> content;
    private Optional<String> password;
    private Optional<Boolean> answerCompleted;

}
