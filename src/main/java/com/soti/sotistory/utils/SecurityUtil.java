package com.soti.sotistory.utils;

import com.soti.sotistory.config.CustomUser;
import com.soti.sotistory.post.exception.PostErrorCode;
import com.soti.sotistory.post.exception.PostException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class SecurityUtil {

    public static String getLoginUserNickname() {

            UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return ((CustomUser) user).getNickname();
    }
}
