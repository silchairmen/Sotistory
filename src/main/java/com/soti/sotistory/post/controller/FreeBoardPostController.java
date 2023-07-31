package com.soti.sotistory.post.controller;

import com.soti.sotistory.config.CustomUser;
import com.soti.sotistory.post.constant.PostType;
import com.soti.sotistory.post.dto.PostDto;
import com.soti.sotistory.post.dto.PostResponseDto;
import com.soti.sotistory.post.entity.Post;
import com.soti.sotistory.post.exception.PasswordNotCorrectException;
import com.soti.sotistory.post.exception.PostNotFoundException;
import com.soti.sotistory.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j
@RequestMapping(value = "/api/post/freeBoard")
@RequiredArgsConstructor
public class FreeBoardPostController {

    //Autowired
    private final PostService postService;

    //페이지당 가져올 글의 개수
    private final int maxPageAmount = 20;


    //글 생성
    @PostMapping("/create")
    public ResponseEntity<PostResponseDto> createPost(@Valid PostDto postDto, BindingResult bindingResult) {
        postDto.setCategoryName("freeBoard");

        //파라미터 검증 실패
        if (!findErrors(bindingResult).equals("ok")){
            PostResponseDto prDto = PostResponseDto.builder()
                    .status(301)
                    .responseMessage("파라미터 검증 실패").build();

            return ResponseEntity.ok().body(prDto);
        }

        //세션에서 사용자 검증
        try{
            postDto.setAuthor(getNicknameFromSession());
        } catch (Exception e){
            return ResponseEntity.ok()
                    .body(PostResponseDto.builder()
                            .status(303)
                            .responseMessage("글 작성 유저 검증 실패").build());
        }

        //글 생성 시작
        try {
            Post post = postService.createPost(postDto);

            log.info("글 생성 글 제목 : {} 작성자 : {}", post.getTitle(), post.getAuthor().getNickname());
            return ResponseEntity.ok().body(PostResponseDto.builder()
                        .status(300)
                        .responseMessage("글 작성 성공")
                        .title(post.getTitle())
                        .author(postDto.getAuthor()).build());

        } catch (Exception e) {

            log.error("서버 에러 발생 : {}",e.getMessage());
            return ResponseEntity.ok()
                    .body(PostResponseDto.builder()
                            .status(304)
                            .responseMessage(e.getMessage()).build());
        }
    }


    //전체 글 조회
    @GetMapping("/posts")
    public ResponseEntity<PostResponseDto> getAllPosts() {
        // 기본적으로 idx가 0부터 시작하기 때문에 보편성을 위해 1을 제함, 즉 index는 1부터 시작하게 함
        PageRequest pageRequest = PageRequest.of(0, maxPageAmount);
        Page<Post> postPage = postService.getAllPost(pageRequest);
        Page<PostResponseDto> responseDtoPage = postPage.map(this::convertToDto);

        PostResponseDto prDto = PostResponseDto.builder()
                .status(200)
                .responseMessage("조회 성공")
                .PageInfo(responseDtoPage).build();

        return ResponseEntity.ok().body(prDto);
    }

    //페이지로 글 조회
    @GetMapping("/posts/{pageIdx}")
    public ResponseEntity<PostResponseDto> getPostsByPage(@PathVariable(required = false) String pageIdx) {
        int pageNum;

        try{
            pageNum = Integer.parseInt(pageIdx) - 1;
        }catch (NumberFormatException ex){
            return ResponseEntity.ok().body(PostResponseDto.builder().status(201).responseMessage("페이지 조회 파라미터 검증 실패").build());
        }catch (Exception ex){
            return ResponseEntity.ok().body(PostResponseDto.builder().status(204).responseMessage("페이지 조회 실패").build());
        }


        // 기본적으로 idx가 0부터 시작하기 때문에 보편성을 위해 1을 제함, 즉 index는 1부터 시작하게 함
        PageRequest pageRequest = PageRequest.of(pageNum, maxPageAmount);
        Page<Post> postPage = postService.getAllPost(pageRequest);
        Page<PostResponseDto> responseDtoPage = postPage.map(this::convertToDto);

        PostResponseDto prDto = PostResponseDto.builder()
                .status(200)
                .responseMessage("조회 성공")
                .PageInfo(responseDtoPage).build();

        return ResponseEntity.ok().body(prDto);
    }



    //글 번호로 접속 {일반글}
    @GetMapping("/post/{id}")
    public ResponseEntity<PostResponseDto> getPostById(@PathVariable Long id) {
        try {
            Post post = postService.getPostById(id);

            //조회 성공, 일반글
            if (post != null && post.getPostType()==PostType.NORMAL) {
                PostResponseDto convertData = convertToDto(post);
                PostResponseDto prDto = PostResponseDto.builder()
                        .status(200)
                        .responseMessage("조회 성공")
                        .postId(convertData.getPostId())
                        .title(convertData.getTitle())
                        .author(convertData.getAuthor())
                        .content(convertData.getContent())
                        .categoryName(convertData.getCategoryName())
                        .postType(convertData.getPostType())
                        .build();

                return ResponseEntity.ok().body(prDto);
            } else {
                throw new PostNotFoundException("해당 id의 일반 글이 존재하지 않습니다.");
            }
        } catch (PostNotFoundException ex) {
            // If a PostNotFoundException is caught, return the exception message in the response body.
            return ResponseEntity.ok().body(PostResponseDto.builder()
                    .status(202)
                    .responseMessage(ex.getMessage()).build());
        }
    }

    //비밀글일 경우 password를 입력받음
    @PostMapping("/post/{id}")
    public ResponseEntity<PostResponseDto> getHiddenPostById(@PathVariable Long id, String password){
        try {
            Post post = postService.getPostById(id);
            if (post != null && post.getPostType() == PostType.HIDDEN) {
                if(!post.getPostPassword().equals(password)){
                    throw new PasswordNotCorrectException("비밀번호가 올바르지 않습니다.");
                }

                PostResponseDto convertData = convertToDto(post);
                PostResponseDto prDto = PostResponseDto.builder()
                        .status(200)
                        .responseMessage("조회 성공")
                        .postId(convertData.getPostId())
                        .title(convertData.getTitle())
                        .author(convertData.getAuthor())
                        .content(convertData.getContent())
                        .categoryName(convertData.getCategoryName())
                        .postType(convertData.getPostType())
                        .build();
                return ResponseEntity.ok().body(prDto);
            } else {
                return ResponseEntity.notFound().build();
            }

        } catch (PostNotFoundException ex) {
            //없는 글을 조회할 경우
            return ResponseEntity.ok().body(PostResponseDto.builder().status(200).responseMessage("글이 존재하지 않습니다.").build());

        } catch (PasswordNotCorrectException ex){
            //비밀번호가 틀렸을 경우
            return ResponseEntity.ok().body(PostResponseDto.builder().status(203).responseMessage("비밀번호가 올바르지 않습니다..").build());
        }
    }



    //게시물 수정
    @PutMapping("/post/edit/{id}")
    public ResponseEntity<PostResponseDto> editPost(@PathVariable Long id,
                                                          @Valid PostDto postDto,
                                                          BindingResult bindingResult) {
        postDto.setCategoryName("freeBoard");

        if (!findErrors(bindingResult).equals("ok")){
            return ResponseEntity.ok().body(PostResponseDto.builder().status(401).responseMessage("글 수정 매개변수 오류.").build());
        }
        //세션에서 유저 정보를 가져옴
        try{
            postDto.setAuthor(getNicknameFromSession());
        } catch (Exception e){
            return ResponseEntity.ok().body(PostResponseDto.builder().status(403).responseMessage("글 수정 유저 검증 실패.").build());
        }


        //수정 시도
        try {
            Post editedPost = postService.editPost(id, postDto);
            log.info("글 수정 시도 : {} 작성자 : {}", editedPost.getTitle(), editedPost.getAuthor().getNickname());
            return ResponseEntity.ok().body(PostResponseDto.builder().status(400).responseMessage("수정 성공").build());
        } catch (PostNotFoundException e) {
            // 해당 게시글이 존재하지 않을 경우 예외 메시지를 클라이언트에게 반환
            return ResponseEntity.ok().body(PostResponseDto.builder().status(402).responseMessage("수정 글이 존재하지 않음").build());
        } catch (Exception e) {
            // 수정 실패 시 예외 메시지를 클라이언트에게 반환
            return ResponseEntity.ok().body(PostResponseDto.builder().status(404).responseMessage("수정 실패").build());
        }
    }

    //글 삭제 method
    @DeleteMapping("/post/delete/{id}")
    public ResponseEntity<PostResponseDto> deletePost(@PathVariable Long id) {
        String nickname = "";

        //세션에서 닉네임 가져옴
        try {
            nickname = getNicknameFromSession();
        } catch (Exception e) {
            return ResponseEntity.ok().body(PostResponseDto.builder().status(503).responseMessage("인증 정보가 올바르지 않습니다.").build());
        }

        //글 삭제 로직
        Post deletedPost = new Post();

        try {
            postService.deletePost(id, nickname);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.ok().body(PostResponseDto.builder().status(502).responseMessage("해당 글이 존재하지 않습니다..").build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.ok().body(PostResponseDto.builder().status(501).responseMessage("삭제 매개변수가 올바르지 않습니다.").build());
        }
        return ResponseEntity.ok().body(PostResponseDto.builder().status(500).responseMessage("글이 삭제되었습니다.").build());
    }

    private PostResponseDto convertToDto(Post post) {

        return PostResponseDto.builder()
                .postId(post.getId().intValue())
                .title(post.getTitle())
                .author(post.getAuthor().getNickname())
                .content(post.getContent())
                .categoryName(post.getCategory().getCategoryName())
                .postType(post.getPostType())
                .build();
    }

    public String getNicknameFromSession(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ((CustomUser) userDetails).getNickname();
    }

    public String findErrors(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // 유효성 검사에 실패한 경우 처리 로직을 추가합니다.

            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for (FieldError fieldError : fieldErrors) {

                return fieldError.getDefaultMessage();
            }
        }
        return "ok";
    }
}
