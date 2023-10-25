package com.soti.sotistory.post.promotional.controller;

import com.soti.sotistory.post.cond.PostSearchCondition;
import com.soti.sotistory.post.promotional.dto.PromotionalPostListDto;
import com.soti.sotistory.post.promotional.dto.PromotionalPostSaveDto;
import com.soti.sotistory.post.promotional.dto.PromotionalPostUpdateDto;
import com.soti.sotistory.post.promotional.service.PromotionalPostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/promotional")
@RestController
@RequiredArgsConstructor
public class PromotionalPostController {

    private final PromotionalPostService postService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/save")
    public void save(@Valid @ModelAttribute PromotionalPostSaveDto saveDto) {
        postService.save(saveDto);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{postId}")
    public void update(@PathVariable("postId") Long postId,
                       @ModelAttribute PromotionalPostUpdateDto updateDto){
        postService.update(postId, updateDto);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{postId}")
    public void delete(@PathVariable("postId") Long postId){
        postService.delete(postId);
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
