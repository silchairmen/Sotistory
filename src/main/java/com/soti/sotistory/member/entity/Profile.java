package com.soti.sotistory.member.entity;


import com.soti.sotistory.member.constant.Role;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "profile")
@Setter
@Getter
@Builder
@NoArgsConstructor // 매개변수가 없는 기본 생성자 추가
@AllArgsConstructor // 모든 필드를 가지는 생성자 추가
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long id;

    //양방향 일대일
    //멤버 정보 매핑
    @OneToOne
    @JoinColumn(name = "member_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    //이력, 이력 또한 따로 테이블 관리 하는게 아닌 String으로 저장
    private String awards;

    //스킬셋 / "." 으로 split 하여 구분할 예정이기 때문에 String으로 저장
    //ex) java.python.spring
    private String skills;

    //프로필 이미지
    private String profileImageName;

    //동아리 내 역할
    private String position;

    //후대에 남기는 메세지
    //원래 클래스를 따로 빼서 주소를 넣었는데 심신 미약 상태로 인해서 그냥 필드에 박습니다... 프론트 어쩌피 못건들죠..?

    //github 주소
    private String githubAddr;

    //tistory 주소
    private String tistoryAddr;

    //dreamhack 주소
    private String dreamhackAddr;
}
