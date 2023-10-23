package com.soti.sotistory.post.question.controller;

import com.soti.sotistory.post.promotional.dto.PromotionalPostUpdateDto;
import com.soti.sotistory.post.question.dto.QuestionPostSaveDto;
import com.soti.sotistory.post.question.dto.QuestionPostUpdateDto;
import com.soti.sotistory.post.question.service.QuestionPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/question")
@RestController
@RequiredArgsConstructor
public class QuestionPostController {

    private final QuestionPostService postService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/save")
    public void save(@Valid @ModelAttribute QuestionPostSaveDto postSaveDto) {
        postService.save(postSaveDto);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{postId}")
    public void update(@PathVariable("postId") Long postId,
                       @ModelAttribute QuestionPostUpdateDto updateDto){
        postService.update(postId, updateDto);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{postId}")
    public void delete(@PathVariable("postId") Long postId){
        postService.delete(postId);
    }

    @GetMapping("/{postId}")
    public ResponseEntity getInfo(@PathVariable("postId") Long postId, String password){
        return ResponseEntity.ok(postService.getPostInfo(postId, password));
    }
}
