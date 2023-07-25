package com.soti.sotistory.post.dto;


import com.soti.sotistory.post.constant.PostType;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PostResponseDto {
    private int postId;

    private String title;

    private String content;

    private String author;

    private String categoryName;

    @Builder.Default
    private PostType postType = PostType.NORMAL;

//    @Builder.Default
//    private String password = "NoPassword";
}
