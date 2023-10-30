package com.soti.sotistory.post.question.controller;

import com.soti.sotistory.post.question.dto.QuestionPostListDto;
import com.soti.sotistory.post.cond.PostSearchCondition;
import com.soti.sotistory.post.question.dto.QuestionPostSaveDto;
import com.soti.sotistory.post.question.dto.QuestionPostUpdateDto;
import com.soti.sotistory.post.question.service.QuestionPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/question")
@RestController
@RequiredArgsConstructor
public class QuestionPostController {

    private final QuestionPostService postService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/save")
    @PreAuthorize("isAuthenticated()")
    public void save(@Valid @ModelAttribute QuestionPostSaveDto postSaveDto) {
        postService.save(postSaveDto);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{postId}")
    @PreAuthorize("isAuthenticated()")
    public void update(@PathVariable("postId") Long postId,
                       @ModelAttribute QuestionPostUpdateDto updateDto){
        postService.update(postId, updateDto);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{postId}")
    @PreAuthorize("isAuthenticated()")
    public void delete(@PathVariable("postId") Long postId){
        postService.delete(postId);
    }

    @GetMapping("/info/{postId}")
    public ResponseEntity getInfo(@PathVariable("postId") Long postId, String password){
        return ResponseEntity.ok(postService.getPostInfo(postId, password));
    }

    @GetMapping({"/"})
    public ResponseEntity<QuestionPostListDto> getPostList(Pageable pageable, PostSearchCondition condition) {
        return this.postService.getPostList(pageable, condition);
    }
}
