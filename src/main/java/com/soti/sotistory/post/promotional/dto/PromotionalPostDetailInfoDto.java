package com.soti.sotistory.post.promotional.dto;

import com.soti.sotistory.post.promotional.entity.PromotionalPost;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class PromotionalPostDetailInfoDto {

    private Long postId; //POST의 ID
    private String title;//제목
    private String content;//내용
    private String filePath;//업로드 파일 경로
    private String writer;//작성자에 대한 정보

    public PromotionalPostDetailInfoDto(PromotionalPost post) {
        this.postId = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.filePath = post.getFilePath();
        this.writer = post.getWriter().getNickname();

    }

}
