package com.soti.sotistory.comment.question.controller;

import com.soti.sotistory.comment.question.dto.QuestionCommentSaveDto;
import com.soti.sotistory.comment.question.dto.QuestionCommentUpdateDto;
import com.soti.sotistory.comment.question.service.QuestionCommentService;
import com.soti.sotistory.utils.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/question/comment")
@RestController
@RequiredArgsConstructor
public class QuestionCommentController {

    private final QuestionCommentService commentService;

    @PostMapping("/{postId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<SuccessResponse> commentSave(@PathVariable("postId") Long postId, QuestionCommentSaveDto commentSaveDto) {
        SuccessResponse response = new SuccessResponse("저장 성공");
        commentService.save(postId, commentSaveDto);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<SuccessResponse> update(@PathVariable("commentId") Long commentId,
                       QuestionCommentUpdateDto commentUpdateDto){
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
