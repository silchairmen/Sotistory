package com.soti.sotistory.post.question.controller;

import com.soti.sotistory.post.question.dto.QuestionPostSaveDto;
import com.soti.sotistory.post.question.service.QuestionPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/question")
@RestController
@RequiredArgsConstructor
public class QuestionPostController {

    private final QuestionPostService postService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/save")
    public void save(@Valid @ModelAttribute QuestionPostSaveDto postSaveDto) {
        postService.save(postSaveDto);
    }
}
