package com.soti.sotistory.post.question.dto;

import com.soti.sotistory.post.question.entity.QuestionPost;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuestionPostDetailInfoDto {

    private Long postId; //POST의 ID
    private String title;//제목
    private String content;//내용
    private String postType;//업로드 파일 경로
    private String writer;//작성자에 대한 정보


    public QuestionPostDetailInfoDto(QuestionPost post) {
        this.postId = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.postType = post.getPostType().toString();
        this.writer = post.getWriter().getNickname();
    }
}
