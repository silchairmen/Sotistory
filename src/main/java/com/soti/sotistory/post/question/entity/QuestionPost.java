package com.soti.sotistory.post.question.entity;

import com.soti.sotistory.post.BaseTimeEntity;
import com.soti.sotistory.post.PostType;
import com.soti.sotistory.comment.question.entity.QuestionComment;
import com.soti.sotistory.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "question_post")
public class QuestionPost extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id")
    private Member writer;

    @Column(length = 40, nullable = false)
    private String title;

    //컨텐츠 특성상 255자 이상 저장되기 때문에 @Lob 어노테이션 사용
    @Lob
    @Column(nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PostType postType;

    private String password;

    private Boolean answerCompleted;

    @Builder
    public QuestionPost(String title, String content){
        this.title = title;
        this.content = content;
    }

    public void confirmWriter(Member writer) {
        this.writer = writer;
        writer.addQuestionPost(this);
    }

    //연관관계 설정
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuestionComment> commentsList = new ArrayList<>();

    public void addComment(QuestionComment comment) {
        commentsList.add(comment);
    }

    public void addAnswerCompleted() {
        this.answerCompleted = false;
    }

    /*내용 수정*/
    public void updateTitle(String title) {
        this.title = title;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void updatePostType(PostType postType) {
        this.postType = postType;
    }

    public void updatePassword(String password){
        this.password=password;
    }

    public void updateAnswerCompleted(Boolean answerCompleted){
        this.answerCompleted=answerCompleted;
    }
}
