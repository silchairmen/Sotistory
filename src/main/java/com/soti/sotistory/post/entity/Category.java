package com.soti.sotistory.post.entity;

import lombok.*;

import javax.persistence.*;

/**
* 게시판 확장 시 해당 카테고리를 확장해서 사용
 * 현재 질문, 자유게시판만 구현하였기에 추후 게시판이 4개이상 늘어난다면 엔티티 분리를 추천함
 * enum 타입으로 구현할수도 있지만 혹시 모를 확장성을 위해 클래스로 구현
* */

@Entity
@Builder @Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "categorys")
public class Category {
    @Id
    @Column(name = "category_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    //free, questions
    @Column(nullable = false, unique = true)
    private String categoryName;
}
