package com.soti.sotistory.member.entity;

import com.soti.sotistory.comment.promotional.entity.PromotionalComment;
import com.soti.sotistory.comment.question.entity.QuestionComment;
import com.soti.sotistory.member.constant.Role;
import com.soti.sotistory.post.promotional.entity.PromotionalPost;
import com.soti.sotistory.post.question.entity.QuestionPost;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.ALL;

@Entity
@Table(name = "members")
@Builder
@Getter
@NoArgsConstructor // 매개변수가 없는 기본 생성자 추가
@AllArgsConstructor // 모든 필드를 가지는 생성자 추가
public class Member {

    //고유 id

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //이름
    private String name;

    //닉네임
    @Column(unique = true) // 닉네임은 중복이 아니여야 함
    private String nickname;

    //학번
    private String stuNum;

    //기수
    private String joinYear;

    //가입 이메일
    @Column(unique = true) //이메일을 통한 중복 제거
    private String email;

    //가입 패스워드
    private String password;

    //주소
    private String address;

    //직급
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Role role = Role.USER;

    //마이페이지(프로필)
    @OneToOne(mappedBy = "member")
    private Profile profile;


    /* 회원탈퇴시 작성한 게시물, 댓글 모두 삭제 */
    @Builder.Default
    @OneToMany(mappedBy = "writer", cascade = ALL, orphanRemoval = true)
    private List<PromotionalPost> promotionalPostList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "writer", cascade = ALL, orphanRemoval = true)
    private List<QuestionPost> questionPostList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "writer", cascade = ALL, orphanRemoval = true)
    private List<QuestionComment> questionCommentList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "writer", cascade = ALL, orphanRemoval = true)
    private List<PromotionalComment> promotionalCommentList = new ArrayList<>();


    /*연관관계부분*/
    public void addPromotionalPost(PromotionalPost promotionalPost) {
        promotionalPostList.add(promotionalPost);
    }

    public void addQuestionPost(QuestionPost questionPost) {
        questionPostList.add(questionPost);
    }

    public void addQuestionComment(QuestionComment comment) {
        questionCommentList.add(comment);
    }

    public void addPromotionalComment(PromotionalComment comment) {
        promotionalCommentList.add(comment);
    }

}