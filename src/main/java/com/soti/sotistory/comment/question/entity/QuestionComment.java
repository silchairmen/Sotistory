package com.soti.sotistory.comment.question.entity;

import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.post.BaseTimeEntity;
import com.soti.sotistory.post.question.entity.QuestionPost;
import lombok.*;

import javax.persistence.*;

@Entity(name = "question_comment")
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuestionComment extends BaseTimeEntity {

    @Id
    @GeneratedValue
    @Column(name = "comment_id")
    private Long id;

    @Column(nullable = false)
    @Lob
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id", nullable = false)
    private Member writer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private QuestionPost post;

    //수정
    public void updateContent(String content) {
        this.content = content;
    }

    //연관관계
    public void confirmWriter(Member writer) {
        this.writer = writer;
        writer.addQuestionComment(this);
    }

    public void confirmPost(QuestionPost post) {
        this.post = post;
        post.addComment(this);
    }

    @Builder
    public QuestionComment(Member writer, QuestionPost post, String content) {
        this.writer = writer;
        this.post = post;
        this.content = content;
    }
}
