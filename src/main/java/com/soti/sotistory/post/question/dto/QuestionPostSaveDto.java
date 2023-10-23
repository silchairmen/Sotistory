package com.soti.sotistory.post.question.dto;

import com.soti.sotistory.post.question.entity.QuestionPost;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class QuestionPostSaveDto {

    @NotBlank(message = "제목을 입력해주세요")
    private String title;

    @NotBlank(message = "내용을 입력해주세요")
    private String content;

    private String password;

    public QuestionPost toEntity() {
        return QuestionPost.builder().title(title).content(content).build();
    }
}