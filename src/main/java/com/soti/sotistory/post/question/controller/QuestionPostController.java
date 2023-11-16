package com.soti.sotistory.post.question.controller;

import com.soti.sotistory.post.question.dto.QuestionPostListDto;
import com.soti.sotistory.post.cond.PostSearchCondition;
import com.soti.sotistory.post.question.dto.QuestionPostSaveDto;
import com.soti.sotistory.post.question.dto.QuestionPostUpdateDto;
import com.soti.sotistory.post.question.service.QuestionPostService;
import com.soti.sotistory.utils.SuccessResponse;
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
    @PostMapping("/")
    public ResponseEntity<SuccessResponse> save(@Valid @ModelAttribute QuestionPostSaveDto postSaveDto) {
        SuccessResponse response = new SuccessResponse("저장 성공");
        postService.save(postSaveDto);
        return ResponseEntity.ok().body(response);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{postId}")
    public ResponseEntity<SuccessResponse> update(@PathVariable("postId") Long postId,
                       @ModelAttribute QuestionPostUpdateDto updateDto){
        SuccessResponse response = new SuccessResponse("수정 성공");
        postService.update(postId, updateDto);
        return ResponseEntity.ok().body(response);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{postId}")
    public ResponseEntity<SuccessResponse> delete(@PathVariable("postId") Long postId){
        SuccessResponse response = new SuccessResponse("삭제 성공");
        postService.delete(postId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{postId}")
    public ResponseEntity getInfo(@PathVariable("postId") Long postId, String password){
        return ResponseEntity.ok(postService.getPostInfo(postId, password));
    }

    @GetMapping({"/"})
    public ResponseEntity<QuestionPostListDto> getPostList(Pageable pageable, PostSearchCondition condition) {
        return this.postService.getPostList(pageable, condition);
    }
}
