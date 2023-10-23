package com.soti.sotistory.comment.controller;


import com.soti.sotistory.comment.dto.CommentSaveDto;
import com.soti.sotistory.comment.dto.CommentUpdateDto;
import com.soti.sotistory.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/comment/{postId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void commentSave(@PathVariable("postId") Long postId, CommentSaveDto commentSaveDto) {
        commentService.save(postId, commentSaveDto);
    }

    @PostMapping("/comment/{postId}/{commentId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void reCommentSave(@PathVariable("postId") Long postId,
                              @PathVariable("commentId") Long commentId,
                              CommentSaveDto commentSaveDto){
        commentService.saveReComment(postId, commentId, commentSaveDto);
    }


    @PutMapping("/comment/{commentId}")
    public void update(@PathVariable("commentId") Long commentId,
                       CommentUpdateDto commentUpdateDto){
        commentService.update(commentId, commentUpdateDto);
    }


    @DeleteMapping("/comment/{commentId}")
    public void delete(@PathVariable("commentId") Long commentId){
        commentService.remove(commentId);
    }
}
