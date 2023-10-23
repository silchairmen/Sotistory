package com.soti.sotistory.comment.repository;

import com.soti.sotistory.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
