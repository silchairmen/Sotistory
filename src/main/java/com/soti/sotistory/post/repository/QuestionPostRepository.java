package com.soti.sotistory.post.repository;

import com.soti.sotistory.post.entity.QuestionPost;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionPostRepository extends JpaRepository<QuestionPost, Long> {

    @EntityGraph(attributePaths = {"writer"})
    Optional<QuestionPost> findWithWriterById(Long id);
}
