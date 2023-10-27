package com.soti.sotistory.post.promotional.dto;

import com.soti.sotistory.comment.promotional.dto.PromotionalCommentInfoDto;
import com.soti.sotistory.comment.promotional.entity.PromotionalComment;
import com.soti.sotistory.post.promotional.entity.PromotionalPost;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PromotionalPostDetailInfoDto {

    private Long postId; //POST의 ID
    private String title;//제목
    private String content;//내용
    private String filePath;//업로드 파일 경로
    private String createDate;
    private String lastModifiedDate;
    private String writer;//작성자에 대한 정보
    private List<PromotionalCommentInfoDto> commentInfoDtoList;

    public PromotionalPostDetailInfoDto(PromotionalPost post) {
        this.postId = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.filePath = post.getFilePath();
        this.createDate = post.getCreateDate().toString();
        this.lastModifiedDate = post.getLastModifiedDate().toString();
        this.writer = post.getWriter().getNickname();

        List<PromotionalComment> comments = post.getCommentsList();
        commentInfoDtoList = comments.stream()
                .map(PromotionalCommentInfoDto::new)
                .toList();

    }

}
