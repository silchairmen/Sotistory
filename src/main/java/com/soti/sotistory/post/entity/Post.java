package com.soti.sotistory.post.entity;

import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.post.constant.PostType;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "posts")
@Builder // @Builder 어노테이션 추가
public class Post extends BaseTimeEntity {

    @Id
    @Column(name = "post_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Lob
    private String content;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member author;

    //자유게시판, 질문게시판
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    //비밀글, 일반글
    @Enumerated(EnumType.STRING)
    @Builder.Default private PostType postType = PostType.NORMAL;

    //질문 게시판에서 비밀스럽게 작성하거나 자유게시판에서 lock 걸때 사용 가능
    @Builder.Default private String postPassword = "NoPassword";

    //댓글
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();
}
