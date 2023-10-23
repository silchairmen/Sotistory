package com.soti.sotistory.post.promotional.controller;

import com.soti.sotistory.post.promotional.dto.PromotionalPostSaveDto;
import com.soti.sotistory.post.promotional.dto.PromotionalPostUpdateDto;
import com.soti.sotistory.post.promotional.service.PromotionalPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/promotional")
@RestController
@RequiredArgsConstructor
public class PromotionalPostController {

    private final PromotionalPostService postService;

    //FileUpload 때문에 json이 아닌 form 형태 구현
    @ResponseStatus(HttpStatus.CREATED)
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
}
