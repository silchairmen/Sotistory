package com.soti.sotistory.comment.promotional.service;


import com.soti.sotistory.comment.promotional.dto.PromotionalCommentSaveDto;
import com.soti.sotistory.comment.promotional.dto.PromotionalCommentUpdateDto;

public interface PromotionalCommentService {

    void save(Long postId, PromotionalCommentSaveDto promotionalCommentSaveDto);
    void saveReComment(Long postId, Long parentId, PromotionalCommentSaveDto promotionalCommentSaveDto);

    void update(Long id, PromotionalCommentUpdateDto promotionalCommentUpdateDto);

    void remove(Long id);
}
