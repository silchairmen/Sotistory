package com.soti.sotistory.comment.question.repository;

import com.soti.sotistory.comment.question.entity.QuestionComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionCommentRepository extends JpaRepository<QuestionComment, Long> {
    
}
