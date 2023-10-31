package com.soti.sotistory.comment.promotional.controller;


import com.soti.sotistory.comment.promotional.dto.PromotionalCommentSaveDto;
import com.soti.sotistory.comment.promotional.dto.PromotionalCommentUpdateDto;
import com.soti.sotistory.comment.promotional.service.PromotionalCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


/**
 * 댓글 작성
 * 댓글 수정
 * 댓글 삭제
 */

@RequestMapping("/api/promotional/comment")
@RestController
@RequiredArgsConstructor
public class PromotionalCommentController {

    private final PromotionalCommentService commentService;

    @PostMapping("/{postId}")
    @ResponseStatus(HttpStatus.OK)
    public void commentSave(@PathVariable("postId") Long postId, PromotionalCommentSaveDto commentSaveDto) {
        commentService.save(postId, commentSaveDto);
    }

    @PutMapping("/{commentId}")
    public void update(@PathVariable("commentId") Long commentId,
                       PromotionalCommentUpdateDto commentUpdateDto){
        commentService.update(commentId, commentUpdateDto);
    }

    @DeleteMapping("/{commentId}")
    public void delete(@PathVariable("commentId") Long commentId){
        commentService.remove(commentId);
    }
}
