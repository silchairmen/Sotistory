package com.soti.sotistory.service;

import com.soti.sotistory.model.Member;

public interface MemberService {
    // 회원 가입
    int join(Member member);

    // 회원 아이디로 회원 조회
    Member getMemberByMemberId(String memberId);

    // 회원 고유 식별 id로 회원 조회

    Member getMemberById(Long id);

    // 비밀번호 찾기
    Member findPassword(String memberId);

    // 비밀번호 초기화
    void resetPassword(String memberId);

    // 비밀번호 변경
    void changePassword(String memberId, String newPassword);

    // 아이디 중복 체크
    boolean isIdDuplicated(String memberId);
}
