package com.soti.sotistory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class SotistoryApplication {

    public static void main(String[] args) {
        SpringApplication.run(SotistoryApplication.class, args);
    }

}