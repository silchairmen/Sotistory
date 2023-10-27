package com.soti.sotistory.post.question.dto;

import com.soti.sotistory.comment.question.dto.QuestionCommentInfoDto;
import com.soti.sotistory.comment.question.entity.QuestionComment;
import com.soti.sotistory.post.question.entity.QuestionPost;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class QuestionPostDetailInfoDto {

    private Long postId; //POST의 ID
    private String title;//제목
    private String content;//내용
    private String postType;//업로드 파일 경로
    private String createDate;
    private String lastModifiedDate;
    private String writer;//작성자에 대한 정보
    private List<QuestionCommentInfoDto> commentInfoDtoList;

    public QuestionPostDetailInfoDto(QuestionPost post) {
        this.postId = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.postType = post.getPostType().toString();
        this.createDate = post.getCreateDate().toString();
        this.lastModifiedDate = post.getLastModifiedDate().toString();
        this.writer = post.getWriter().getNickname();

        List<QuestionComment> comments = post.getCommentsList();
        commentInfoDtoList = comments.stream()
                .map(QuestionCommentInfoDto::new)
                .toList();
    }
}
