package com.soti.sotistory.comment.question.dto;

import com.soti.sotistory.comment.question.entity.QuestionComment;
import lombok.Data;

@Data
public class QuestionCommentInfoDto {

    private Long postId;//댓글이 달린 POST의 ID
    private Long commentId;//해당 댓글의 ID
    private String content;//내용
    private String writer;//댓글 작성자에 대한 정보
    private String created;
    private String modified;

    public QuestionCommentInfoDto(QuestionComment comment) {

        this.postId = comment.getPost().getId();
        this.commentId = comment.getId();
        this.content = comment.getContent();
        this.writer = comment.getWriter().getNickname();
        this.modified = comment.getLastModifiedDate().toString();
        this.created = comment.getCreateDate().toString();
    }
}