package com.soti.sotistory.member.repository;

import com.soti.sotistory.member.constant.Role;
import com.soti.sotistory.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {

        //Email 형식으로 찾기
        Member findByEmail(String email);

        //닉네임 형식으로 찾기
        Member findByNickname(String nickname);

        //롤로 찾기
        List<Member> findByRole(Role role);
}
