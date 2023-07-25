package com.soti.sotistory.post.service;

import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.member.repository.MemberRepository;
import com.soti.sotistory.post.constant.PostType;
import com.soti.sotistory.post.dto.PostDto;
import com.soti.sotistory.post.entity.Category;
import com.soti.sotistory.post.entity.Post;
import com.soti.sotistory.post.exception.PostNotFoundException;
import com.soti.sotistory.post.repository.CategoryRepository;
import com.soti.sotistory.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor //생성자 주입
public class PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;

    public Post createPost(PostDto postDto) {
        //사용자 검증
        Member author = memberRepository.findByNickname(postDto.getAuthor());
        if (author == null) {
            throw new IllegalArgumentException("인증되지 않은 사용자입니다.");
        }

        //카테고리 검증
        Category category = categoryRepository.findById(categoryRepository.
                        findByCategoryName(postDto.getCategoryName())
                        .getId())
                .orElseThrow(() -> new IllegalArgumentException("카테고리 정보가 존재하지 않습니다."));

        Post.PostBuilder postBuilder = Post.builder()
                .author(author)
                .category(category)
                .title(postDto.getTitle())
                .content(postDto.getContent())
                .postType(postDto.getPostType());

        // postType이 "HIDDEN"인 경우에만 postPassword를 설정
        if (postDto.getPostType() == PostType.HIDDEN) {
            postBuilder.postType(postDto.getPostType());
            postBuilder.postPassword(postDto.getPostPassword());
        }

        //객체 빌드
        Post post = postBuilder.build();

        return postRepository.save(post);
    }

    //게시글 전부 조회
    public Page<Post> getAllPost(Pageable pageable){
        return postRepository.findAll(pageable);
    }

    //특정 게시물 조회 (id 조회)
    public Post getPostById(Long id) {
        Optional<Post> postOptional = postRepository.findById(id);

        if (postOptional.isPresent()) {
            return postOptional.get();
        } else {
            throw new PostNotFoundException("Post not found with ID: " + id);
        }
    }

    //게시물 수정
    public Post editPost(Long id, PostDto postDto) {
        // 기존 게시글 조회
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("해당 게시글이 없습니다."));

        // Post 객체 수정
        try {
            post.update(postDto.getTitle(), postDto.getContent(), postDto.getPostType(), postDto.getPostPassword());
        } catch (Exception e) {
            throw new RuntimeException("게시글 수정에 실패하였습니다.");
        }

        return postRepository.save(post);
    }
}
