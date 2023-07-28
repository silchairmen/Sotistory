package com.soti.sotistory.config;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

/**
 * 세션에 저장될 정보들을 추가해 줄 수 있음
 * 현재 담긴 정보
 * 1. 이메일 (unique 건들 ㄴ)
 * 2. password
 * 3. add) nickname
 *
 * 민감정보가 있으니깐 Setter 금지
 * */

@Getter
public class CustomUser extends User {

    private final String nickname;

    public CustomUser(String username, String password, Collection<? extends GrantedAuthority> authorities, String nickname) {
        super(username, password, authorities);
        this.nickname = nickname;
    }
}