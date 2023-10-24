package com.soti.sotistory.comment.promotional.repository;

import com.soti.sotistory.comment.promotional.entity.PromotionalComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionalCommentRepository extends JpaRepository<PromotionalComment, Long> {
    
}
