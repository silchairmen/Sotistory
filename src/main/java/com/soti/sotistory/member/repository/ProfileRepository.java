package com.soti.sotistory.member.repository;

import com.soti.sotistory.member.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Profile findByMemberId(Long memberId);


}
