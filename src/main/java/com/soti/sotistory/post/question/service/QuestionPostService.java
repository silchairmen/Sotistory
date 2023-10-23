package com.soti.sotistory.post.question.service;

import com.soti.sotistory.post.question.dto.QuestionPostDetailInfoDto;
import com.soti.sotistory.post.question.dto.QuestionPostSaveDto;
import com.soti.sotistory.post.question.dto.QuestionPostUpdateDto;

public interface QuestionPostService {

    void save(QuestionPostSaveDto postSaveDto);

    void update(Long id, QuestionPostUpdateDto postUpdateDto);

    void delete(Long id);

    QuestionPostDetailInfoDto getPostInfo(Long id, String password);

}
