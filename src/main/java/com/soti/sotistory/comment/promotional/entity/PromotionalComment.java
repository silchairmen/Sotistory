package com.soti.sotistory.comment.promotional.entity;

import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.post.BaseTimeEntity;
import com.soti.sotistory.post.promotional.entity.PromotionalPost;
import lombok.*;

import javax.persistence.*;

@Entity(name = "promotional_comment")
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PromotionalComment extends BaseTimeEntity {

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
    private PromotionalPost post;

    //수정
    public void updateContent(String content) {
        this.content = content;
    }

    //연관관계
    public void confirmWriter(Member writer) {
        this.writer = writer;
        writer.addPromotionalComment(this);
    }

    public void confirmPost(PromotionalPost post) {
        this.post = post;
        post.addComment(this);
    }

    @Builder
    public PromotionalComment(Member writer, PromotionalPost post, String content) {
        this.writer = writer;
        this.post = post;
        this.content = content;
    }
}
