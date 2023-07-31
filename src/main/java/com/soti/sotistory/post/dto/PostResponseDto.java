package com.soti.sotistory.post.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.soti.sotistory.post.constant.PostType;
import com.soti.sotistory.post.entity.Comment;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class PostResponseDto {
    //상태
    private int status;

    //메세지
    private String responseMessage;

    //글 id
    private int postId;

    //제목
    private String title;

    //내용
    private String content;

    //작성자 : 닉네임
    private String author;

    //카테고리 (free, secret 등등)
    private String categoryName;

    //일반글 비밀글
    private PostType postType = PostType.NORMAL;

    //페이징 정보
    private Page<PostResponseDto> PageInfo;

    //댓글
    private List<Comment> comments = new ArrayList<>();
}
