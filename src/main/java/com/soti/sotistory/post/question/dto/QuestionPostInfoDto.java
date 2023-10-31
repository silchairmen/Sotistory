package com.soti.sotistory.post.question.dto;

import com.soti.sotistory.post.PostType;
import com.soti.sotistory.post.question.entity.QuestionPost;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuestionPostInfoDto {

    //question post는 비밀글이 있기 때문에 content를 포함하지 않은 상태로 pagging한다.
    private Long postId; //POST의 ID
    private String title;//제목
    private String postType;//업로드 파일 경로
    private String createDate;
    private String lastModifiedDate;
    private String writer;//작성자에 대한 정보
    private Long commentSize;


    public QuestionPostInfoDto(QuestionPost post) {
        this.postId = post.getId();
        if (post.getPostType()== PostType.HIDDEN){
            this.title = "비밀글 입니다.";
        } else {
            this.title = post.getTitle();
        }
        this.writer = post.getWriter().getNickname();
        this.postType = post.getPostType().toString();
        this.createDate = post.getCreateDate().toString();
        this.lastModifiedDate = post.getLastModifiedDate().toString();
        this.commentSize = (long) post.getCommentsList().size();
    }
}
