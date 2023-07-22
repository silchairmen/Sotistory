package com.soti.sotistory.post.entity;

import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.post.dto.CommentDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder @Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "comments")
public class Comment extends BaseTimeEntity{
    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String content;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member author;

}
