package com.soti.sotistory.post.question.entity;

import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.post.PostType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "question_post")
public class QuestionPost {

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

    public void setContentType(PostType postType){
        this.postType=postType;
    }

    public void setPassword(String password){
        this.password=password;
    }

    @Builder
    public QuestionPost(String title, String content, String filePath){
        this.title = title;
        this.content = content;
    }

    public void confirmWriter(Member writer) {
        this.writer = writer;
        writer.addQuestionPost(this);
    }
}
