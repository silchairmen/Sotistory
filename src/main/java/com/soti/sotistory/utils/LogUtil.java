package com.soti.sotistory.utils;

import lombok.extern.slf4j.Slf4j;

import java.util.UUID;

@Slf4j
public class LogUtil {

    public static void logInfo(String ip, String url, String method) {

        try{
            log.info("{} -> {} -> {} -> {}", ip, SecurityUtil.getLoginUserNickname(), method, url);
        } catch (NullPointerException | ClassCastException e) {
            log.info("{} -> {} -> {} -> {}", ip, UUID.randomUUID().toString().substring(0,8), method, url);
        }

    }
}
