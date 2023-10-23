package com.soti.sotistory.comment.promotional.controller;


import com.soti.sotistory.comment.promotional.dto.PromotionalCommentSaveDto;
import com.soti.sotistory.comment.promotional.dto.PromotionalCommentUpdateDto;
import com.soti.sotistory.comment.promotional.service.PromotionalCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/promotional/comment")
@RestController
@RequiredArgsConstructor
public class PromotionalCommentController {

    private final PromotionalCommentService commentService;

    @PostMapping("/{postId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void commentSave(@PathVariable("postId") Long postId, PromotionalCommentSaveDto promotionalCommentSaveDto) {
        commentService.save(postId, promotionalCommentSaveDto);
    }

    @PostMapping("/{postId}/{commentId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void reCommentSave(@PathVariable("postId") Long postId,
                              @PathVariable("commentId") Long commentId,
                              PromotionalCommentSaveDto promotionalCommentSaveDto){
        commentService.saveReComment(postId, commentId, promotionalCommentSaveDto);
    }


    @PutMapping("/{commentId}")
    public void update(@PathVariable("commentId") Long commentId,
                       PromotionalCommentUpdateDto promotionalCommentUpdateDto){
        commentService.update(commentId, promotionalCommentUpdateDto);
    }


    @DeleteMapping("/{commentId}")
    public void delete(@PathVariable("commentId") Long commentId){
        commentService.remove(commentId);
    }
}
