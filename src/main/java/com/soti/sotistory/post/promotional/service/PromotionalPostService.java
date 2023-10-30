package com.soti.sotistory.post.promotional.service;

import com.soti.sotistory.post.cond.PostSearchCondition;
import com.soti.sotistory.post.promotional.dto.PromotionalPostDetailInfoDto;
import com.soti.sotistory.post.promotional.dto.PromotionalPostListDto;
import com.soti.sotistory.post.promotional.dto.PromotionalPostSaveDto;
import com.soti.sotistory.post.promotional.dto.PromotionalPostUpdateDto;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface PromotionalPostService {

    void save(PromotionalPostSaveDto postSaveDto);

    void update(Long id, PromotionalPostUpdateDto postUpdateDto);

    void delete(Long id);

    PromotionalPostDetailInfoDto getPostInfo(Long id);

    ResponseEntity<PromotionalPostListDto> getPostList(Pageable pageable, PostSearchCondition condition);
}
