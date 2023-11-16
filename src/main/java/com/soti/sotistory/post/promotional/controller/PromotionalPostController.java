package com.soti.sotistory.post.promotional.controller;

import com.soti.sotistory.post.cond.PostSearchCondition;
import com.soti.sotistory.post.promotional.service.PromotionalPostService;
import com.soti.sotistory.post.promotional.dto.PromotionalPostListDto;
import com.soti.sotistory.post.promotional.dto.PromotionalPostSaveDto;
import com.soti.sotistory.post.promotional.dto.PromotionalPostUpdateDto;
import com.soti.sotistory.utils.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/promotional")
@RestController
@RequiredArgsConstructor
public class PromotionalPostController {

    private final PromotionalPostService postService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/")
    public ResponseEntity<SuccessResponse> save(@Valid @ModelAttribute PromotionalPostSaveDto saveDto) {
        SuccessResponse response = new SuccessResponse("저장 성공");
        postService.save(saveDto);
        return ResponseEntity.ok().body(response);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{postId}")
    public ResponseEntity<SuccessResponse> update(@PathVariable("postId") Long postId,
                       @ModelAttribute PromotionalPostUpdateDto updateDto){
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
    public ResponseEntity getInfo(@PathVariable("postId") Long postId){
        return ResponseEntity.ok(postService.getPostInfo(postId));
    }

    @GetMapping({"/"})
    public ResponseEntity<PromotionalPostListDto> getPostList(Pageable pageable, PostSearchCondition condition) {
        return this.postService.getPostList(pageable, condition);
    }
}
