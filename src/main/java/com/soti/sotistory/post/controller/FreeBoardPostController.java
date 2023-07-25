package com.soti.sotistory.post.controller;

import com.soti.sotistory.post.constant.PostType;
import com.soti.sotistory.post.dto.PostDto;
import com.soti.sotistory.post.dto.PostResponseDto;
import com.soti.sotistory.post.dto.PostResponseStatusDto;
import com.soti.sotistory.post.entity.Post;
import com.soti.sotistory.post.exception.PasswordNotCorrectException;
import com.soti.sotistory.post.exception.PostNotFoundException;
import com.soti.sotistory.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@Slf4j
@RequestMapping(value = "/api/post/freeBoard")
@RequiredArgsConstructor
public class FreeBoardPostController {

    //Autowired
    private final PostService postService;

    private final int maxPageAmount = 20;


    //글 생성
    @PostMapping(value = "/create")
    public ResponseEntity<PostResponseStatusDto> createPost(@Valid PostDto postDto) {
        postDto.setCategoryName("freeBoard");

        try {
            Post post = postService.createPost(postDto);
            return ResponseEntity.ok(new PostResponseStatusDto(200, "created", post));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    new PostResponseStatusDto(403, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new PostResponseStatusDto(500, e.getMessage(), null));
        }
    }

    //전체 글 조회
    @GetMapping("/posts")
    public ResponseEntity<?> getAllPosts() {
        // 기본적으로 idx가 0부터 시작하기 때문에 보편성을 위해 1을 제함, 즉 index는 1부터 시작하게 함
        PageRequest pageRequest = PageRequest.of(0, maxPageAmount);
        Page<Post> postPage = postService.getAllPost(pageRequest);
        Page<PostResponseDto> responseDtoPage = postPage.map(this::convertToDto);
        return ResponseEntity.ok(responseDtoPage);
    }

    //페이지로 글 조회
    @GetMapping("/posts/{pageIdx}")
    public ResponseEntity<?> getPostsByPage(@PathVariable(required = false) String pageIdx) {
        int pageNum;

        try{
            pageNum = Integer.parseInt(pageIdx) - 1;
        }catch (NumberFormatException ex){
            return ResponseEntity.badRequest().body("정수 형식으로만 페이지를 찾을 수 있습니다");
        }catch (Exception ex){
            return ResponseEntity.badRequest().body("서버 요청 중 오류가 발생하였습니다");
        }


        // 기본적으로 idx가 0부터 시작하기 때문에 보편성을 위해 1을 제함, 즉 index는 1부터 시작하게 함
        PageRequest pageRequest = PageRequest.of(pageNum, maxPageAmount);
        Page<Post> postPage = postService.getAllPost(pageRequest);
        Page<PostResponseDto> responseDtoPage = postPage.map(this::convertToDto);
        return ResponseEntity.ok(responseDtoPage);
    }



    //글 번호로 접속 {일반글}
    @GetMapping("/post/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id) {
        try {
            Post post = postService.getPostById(id);
            if (post != null && post.getPostType()==PostType.NORMAL) {
                PostResponseDto responseDto = convertToDto(post);
                return ResponseEntity.ok(responseDto);
            } else {
                throw new PostNotFoundException("해당 id의 일반 글이 존재하지 않습니다.");
            }
        } catch (PostNotFoundException ex) {
            // If a PostNotFoundException is caught, return the exception message in the response body.
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    //비밀글일 경우 password를 입력받음
    @PostMapping("/post/{id}")
    public ResponseEntity<?> getHiddenPostById(@PathVariable Long id, @RequestBody String password){
        try {
            Post post = postService.getPostById(id);
            if (post != null && post.getPostType() == PostType.HIDDEN) {
                if(post.getPostPassword() == password){
                    throw new PasswordNotCorrectException("비밀번호가 올바르지 않습니다.");
                }

                PostResponseDto responseDto = convertToDto(post);
                return ResponseEntity.ok(responseDto);
            } else {
                return ResponseEntity.notFound().build();
            }

        } catch (PostNotFoundException ex) {
            //없는 글을 조회할 경우
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());

        } catch (PasswordNotCorrectException ex){
            //비밀번호가 틀렸을 경우
            return ResponseEntity.status(HttpStatus.FOUND).body(ex.getMessage());
        }
    }

    //게시물 수정
    @PutMapping("/post/edit/{id}")
    public ResponseEntity<PostResponseStatusDto> editPost(@PathVariable Long id, @Valid @RequestBody PostDto postDto) {
        try {
            Post editedPost = postService.editPost(id, postDto);
            PostResponseStatusDto responseDto = new PostResponseStatusDto(200, "수정 성공",editedPost);
            return ResponseEntity.ok(responseDto);
        } catch (PostNotFoundException e) {
            // 해당 게시글이 존재하지 않을 경우 예외 메시지를 클라이언트에게 반환
            PostResponseStatusDto responseDto = new PostResponseStatusDto(400,"게시물 정보 없음", null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseDto);
        } catch (Exception e) {
            // 수정 실패 시 예외 메시지를 클라이언트에게 반환
            PostResponseStatusDto responseDto = new PostResponseStatusDto(500, "수정 실패",null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseDto);
        }
    }

    private PostResponseDto convertToDto(Post post) {
        PostResponseDto postResponseDto = PostResponseDto.builder()
                .postId(post.getId().intValue())
                .title(post.getTitle())
                .author(post.getAuthor().getNickname())
                .content(post.getContent())
                .categoryName(post.getCategory().getCategoryName())
                .postType(post.getPostType())
                .build();

        return postResponseDto;
    }
}
