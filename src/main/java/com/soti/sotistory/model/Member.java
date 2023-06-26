package com.soti.sotistory.model;

import com.soti.sotistory.model.Grade;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@RequiredArgsConstructor
@Table(name = "members")
public class Member {
    // 고유 식별자 id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 이름
    @Column(nullable = false)
    private String name;

    // 학번
    @Column(nullable = false)
    private String studentId;

    // 기수
    @Column(nullable = false)
    private int year;

    // 전화번호
    @Column(nullable = false)
    private String phoneNumber;

    // 이메일
    @Column(nullable = false)
    private String email;

    // 성별
    @Column(nullable = false)
    private String gender;

    // 로그인 ID
    @Column(nullable = false, unique = true)
    private String memberId;

    // 비밀번호
    @Column(nullable = false)
    private String password;

    // 등급
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Grade grade;

    // 생성자, getter, setter, equals, hashCode 등 생략
}