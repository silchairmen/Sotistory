package com.soti.sotistory.post.question.service;

import com.soti.sotistory.post.cond.PostSearchCondition;
import com.soti.sotistory.post.promotional.dto.PromotionalPostListDto;
import com.soti.sotistory.post.question.dto.QuestionPostDetailInfoDto;
import com.soti.sotistory.post.question.dto.QuestionPostListDto;
import com.soti.sotistory.post.question.dto.QuestionPostSaveDto;
import com.soti.sotistory.post.question.dto.QuestionPostUpdateDto;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface QuestionPostService {

    void save(QuestionPostSaveDto postSaveDto);

    void update(Long id, QuestionPostUpdateDto postUpdateDto);

    void delete(Long id);

    QuestionPostDetailInfoDto getPostInfo(Long id, String password);

    ResponseEntity<QuestionPostListDto> getPostList(Pageable pageable, PostSearchCondition condition);

}
