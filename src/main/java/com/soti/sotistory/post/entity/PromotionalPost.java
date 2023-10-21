package com.soti.sotistory.post.entity;

import com.soti.sotistory.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "promotional_post")
public class PromotionalPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "promotional_id")
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

    @Column(nullable = true)
    private String filePath;

    @Builder
    public PromotionalPost(String title, String content, String filePath){
        this.title = title;
        this.content = content;
        this.filePath = filePath;
    }
}
