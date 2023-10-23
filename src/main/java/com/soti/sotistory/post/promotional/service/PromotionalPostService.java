package com.soti.sotistory.post.promotional.service;

import com.soti.sotistory.post.promotional.dto.PromotionalPostSaveDto;
import com.soti.sotistory.post.promotional.dto.PromotionalPostUpdateDto;

public interface PromotionalPostService {
    void save(PromotionalPostSaveDto promotionalPostSaveDto);

    void update(Long id, PromotionalPostUpdateDto promotionalPostUpdateDto);
}
