package com.soti.sotistory.comment.question.controller;

import com.soti.sotistory.comment.question.dto.QuestionCommentSaveDto;
import com.soti.sotistory.comment.question.dto.QuestionCommentUpdateDto;
import com.soti.sotistory.comment.question.service.QuestionCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/question/comment")
@RestController
@RequiredArgsConstructor
public class QuestionCommentController {

    private final QuestionCommentService commentService;

    @PostMapping("/{postId}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("isAuthenticated()") //로그인 되어야만 처리가능
    public void commentSave(@PathVariable("postId") Long postId, QuestionCommentSaveDto commentSaveDto) {
        commentService.save(postId, commentSaveDto);
    }

    @PutMapping("/{commentId}")
    @PreAuthorize("isAuthenticated()")
    public void update(@PathVariable("commentId") Long commentId,
                       QuestionCommentUpdateDto commentUpdateDto){
        commentService.update(commentId, commentUpdateDto);
    }

    @DeleteMapping("/{commentId}")
    @PreAuthorize("isAuthenticated()")
    public void delete(@PathVariable("commentId") Long commentId){
        commentService.remove(commentId);
    }
}
