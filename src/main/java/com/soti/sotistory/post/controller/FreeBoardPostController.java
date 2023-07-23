package com.soti.sotistory.post.controller;

import com.soti.sotistory.post.dto.PostDto;
import com.soti.sotistory.post.dto.PostResponseStatusDto;
import com.soti.sotistory.post.entity.Post;
import com.soti.sotistory.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@Slf4j
@RequestMapping(value = "/api/post/freeBoard")
@RequiredArgsConstructor
public class FreeBoardPostController {

    //Autowired
    private final PostService postService;


    //글 생성
    @PostMapping(value = "/create")
    public PostResponseStatusDto createPost(@Valid PostDto postDto) {
        postDto.setCategoryName("freeBoard");

        try {
            Post post = postService.createPost(postDto);
            return new PostResponseStatusDto(200, "created", post);

        } catch (IllegalArgumentException e) {
            return new PostResponseStatusDto(401, e.getMessage(), null);

        } catch (Exception e) {
            return new PostResponseStatusDto(500, e.getMessage(), null);
        }
    }
}
