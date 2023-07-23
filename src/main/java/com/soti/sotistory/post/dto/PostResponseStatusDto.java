package com.soti.sotistory.post.dto;


import com.soti.sotistory.post.entity.Post;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostResponseStatusDto {
    private int status;
    private String responseMessage;
    private Long postId;
    private String postTitle;
    private String authorName;

    public PostResponseStatusDto(int status, String responseMessage, Post post) {
        if (post != null) {
            this.postId = post.getId();
            this.postTitle = post.getTitle();
            this.authorName = post.getAuthor().getName();
        }
        this.status = status;
        this.responseMessage = responseMessage;
    }
}

