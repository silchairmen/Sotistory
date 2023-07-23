package com.soti.sotistory.config;

import com.soti.sotistory.post.entity.Category;
import com.soti.sotistory.post.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

/**
 * 데이터 로더
 * 게시판에서 freeboard, questions 필드를 생성함
 *
 * */


@Configuration
public class DataLoader {

    private final CategoryRepository categoryRepository;

    public DataLoader(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            // 여기서 freeboard와 qnaboard를 저장하도록 코드 작성
            Category freeboard = new Category(null, "freeBoard");
            Category qnaboard = new Category(null, "questionsBoard");

            categoryRepository.save(freeboard);
            categoryRepository.save(qnaboard);
        };
    }
}
