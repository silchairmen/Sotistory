package com.soti.sotistory.post.dto;

import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.post.entity.Post;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
public class CommentDto {

    private String content;

    private Post post;

    private Member author;
}
