package com.soti.sotistory.comment.promotional.controller;


import com.soti.sotistory.comment.promotional.dto.PromotionalCommentSaveDto;
import com.soti.sotistory.comment.promotional.dto.PromotionalCommentUpdateDto;
import com.soti.sotistory.comment.promotional.service.PromotionalCommentService;
import com.soti.sotistory.utils.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<SuccessResponse> commentSave(@PathVariable("postId") Long postId, PromotionalCommentSaveDto commentSaveDto) {
        SuccessResponse response = new SuccessResponse("저장 성공");
        commentService.save(postId, commentSaveDto);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<SuccessResponse> update(@PathVariable("commentId") Long commentId,
                       PromotionalCommentUpdateDto commentUpdateDto){
        SuccessResponse response = new SuccessResponse("수정 성공");
        commentService.update(commentId, commentUpdateDto);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<SuccessResponse> delete(@PathVariable("commentId") Long commentId){
        SuccessResponse response = new SuccessResponse("삭제 성공");
        commentService.remove(commentId);
        return ResponseEntity.ok().body(response);
    }
}
