package com.soti.sotistory.post.service;

import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.member.repository.MemberRepository;
import com.soti.sotistory.post.constant.PostType;
import com.soti.sotistory.post.dto.PostDto;
import com.soti.sotistory.post.entity.Category;
import com.soti.sotistory.post.entity.Post;
import com.soti.sotistory.post.repository.CategoryRepository;
import com.soti.sotistory.post.repository.PostRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@TestPropertySource(locations="classpath:application-test.properties")
class PostServiceTest {
    @Autowired
    PostRepository postRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    PostService postService;

    @Autowired
    PasswordEncoder passwordEncoder;

    Member member = Member.builder()
            .name("tester")
            .nickname("tester")
            .stuNum("120181769")
            .joinYear("1")
            .email("test@soti.com")
            .password("test")
            .address("test")
            .build();
    Category category = Category.builder().categoryName("free_Board").build();

    @BeforeEach
    void setUp(){
        memberRepository.save(member);
        categoryRepository.save(category);
    }

    @Test
    @DisplayName("글 생성 TASK 1 > 일반 글 생성")
    void createPostTest(){
        //given
        Long authorId = member.getId();
        String memberNickname = member.getNickname();
        String title = "테스트 제목";
        String content = "테스트 내용";
        PostType postType = PostType.NORMAL;

        PostDto postDto = new PostDto();
        postDto.setAuthorId(authorId);
        postDto.setAuthor(memberNickname);
        postDto.setCategoryName(category.getCategoryName());
        postDto.setTitle(title);
        postDto.setContent(content);
        postDto.setPostType(postType);

        //when
        Post createdPost = postService.createPost(postDto);

        //then
        assertEquals(postDto.getAuthorId(), createdPost.getAuthor().getId());
        assertEquals(postDto.getCategoryName(), createdPost.getCategory().getCategoryName());
        assertEquals(postDto.getTitle(), createdPost.getTitle());
        assertEquals(postDto.getContent(), createdPost.getContent());
        assertEquals(postDto.getPostType(), createdPost.getPostType());

        assertNotEquals(postDto.getPostPassword(), createdPost.getPostPassword());

    }


    @Test
    @DisplayName("글 생성 TASK 2 > 비밀 글 생성")
    void createSecretPostTest() {
        // Arrange
        String memberNickname = member.getNickname();
        String title = "테스트 제목";
        String content = "테스트 내용";
        PostType postType = PostType.HIDDEN;
        String postPassword = "비밀번호";

        PostDto postDto = new PostDto();
        postDto.setAuthor(memberNickname);
        postDto.setCategoryName(category.getCategoryName());
        postDto.setTitle(title);
        postDto.setContent(content);
        postDto.setPostType(postType);
        postDto.setPostPassword(postPassword);

        // Act
        Post createdPost = postService.createPost(postDto);


        //then
        assertEquals(postDto.getAuthor(), createdPost.getAuthor().getNickname());
        assertEquals(postDto.getCategoryName(), createdPost.getCategory().getCategoryName());
        assertEquals(postDto.getTitle(), createdPost.getTitle());
        assertEquals(postDto.getContent(), createdPost.getContent());
        assertEquals(postDto.getPostType(), createdPost.getPostType());

        assertEquals(postDto.getPostPassword(), createdPost.getPostPassword());
    }

    @Test
    @DisplayName("글 생성 실패 TASK 1 > 작성자 조회 결과가 없는 ID")
    void createSecretPostWithoutPasswordTest() {
        // given
        Long authorId = 1231313L;
        String title = "테스트 제목";
        String content = "테스트 내용";
        PostType postType = PostType.HIDDEN;
        String postPassword = "비밀번호";

        PostDto postDto = new PostDto();
        postDto.setAuthorId(authorId);
        postDto.setCategoryName(category.getCategoryName());
        postDto.setTitle(title);
        postDto.setContent(content);
        postDto.setPostType(postType);
        postDto.setPostPassword(postPassword);

        // when //then
        assertThrows(IllegalArgumentException.class,
                () -> postService.createPost(postDto));
    }

    @Test
    @DisplayName("글 생성 실패 TASK 2 > 게시판 ID가 없는 게시물 생성")
    void createPostWithWrongPostIdTest(){
        // given
        Long authorId = 1231313L;
        String title = "테스트 제목";
        String content = "테스트 내용";
        PostType postType = PostType.HIDDEN;
        String postPassword = "비밀번호";

        PostDto postDto = new PostDto();
        postDto.setAuthorId(authorId);
        postDto.setCategoryName(category.getCategoryName());
        postDto.setTitle(title);
        postDto.setContent(content);
        postDto.setPostType(postType);
        postDto.setPostPassword(postPassword);

        // when //then
        assertThrows(IllegalArgumentException.class,
                () -> postService.createPost(postDto));
    }

    @Test
    @DisplayName("글생성 실패 TASK 3 > 존재하지 않는 게시판에 글 작성")
    void createPostWithWrongPostCategoryTest(){
        // given
        Long authorId = 1231313L;
        String title = "테스트 제목";
        String content = "테스트 내용";
        PostType postType = PostType.HIDDEN;
        String postPassword = "비밀번호";

        PostDto postDto = new PostDto();
        postDto.setAuthorId(authorId);
        postDto.setCategoryName("category1234");
        postDto.setTitle(title);
        postDto.setContent(content);
        postDto.setPostType(postType);
        postDto.setPostPassword(postPassword);

        // when //then
        assertThrows(IllegalArgumentException.class,
                () -> postService.createPost(postDto));
    }
}
