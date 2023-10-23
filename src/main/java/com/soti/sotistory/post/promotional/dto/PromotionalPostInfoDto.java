package com.soti.sotistory.post.promotional.dto;

import com.soti.sotistory.post.promotional.entity.PromotionalPost;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PromotionalPostInfoDto {

    private Long postId; //POST의 ID
    private String title;//제목
    private String content;//내용
    private String filePath;//업로드 파일 경로
    private String writer;//작성자에 대한 정보
    private Long commentCount;//댓글 정보들

    public PromotionalPostInfoDto(PromotionalPost promotionalPost) {
        this.postId = promotionalPost.getId();
        this.title = promotionalPost.getTitle();
        this.content = promotionalPost.getContent();
        this.filePath = promotionalPost.getFilePath();
        this.writer = promotionalPost.getWriter().getNickname();
        this.commentCount = (long) promotionalPost.getPromotionalCommentList().size();
    }

}
