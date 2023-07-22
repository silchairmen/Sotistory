package com.soti.sotistory.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

/**
 * 현재 로그인 되어있는 사용자의 정보를 가져온다.
 * 로그인 되어있는 사용자의 id를 가져와서 반환한다.
 * 로그인 되어있는 사용자가 아니라면 Optional에서 Null을 핸들링 하여 반환한다.
 * */

public class AuditorAwareImpl implements AuditorAware<String> {


    //현재 로그인 한 사용자의 정보를 조회하여 사용자의 이름을 등록자와 수정자로 지정한다.
    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String userId = "";
        if (authentication != null){
            userId = authentication.getName();
        }

        return Optional.of(userId); //null 값을 대처하기 위한 Optional 객체 반환.
    }
}
