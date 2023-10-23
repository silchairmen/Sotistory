package com.soti.sotistory.post.question.service;

import com.soti.sotistory.post.promotional.dto.PromotionalPostSaveDto;
import com.soti.sotistory.post.question.dto.QuestionPostSaveDto;

public interface QuestionPostService {

    void save(QuestionPostSaveDto postSaveDto);
}
