package com.soti.sotistory.comment.service;


import com.soti.sotistory.comment.dto.CommentSaveDto;
import com.soti.sotistory.comment.dto.CommentUpdateDto;

public interface CommentService {

    void save(Long postId, CommentSaveDto commentSaveDto);
    void saveReComment(Long postId, Long parentId, CommentSaveDto commentSaveDto);

    void update(Long id, CommentUpdateDto commentUpdateDto);

    void remove(Long id);
}
