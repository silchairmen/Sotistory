package com.soti.sotistory.post.repository;

import com.soti.sotistory.post.entity.PromotionalPost;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PromotionalPostRepository extends JpaRepository<PromotionalPost, Long> {

    @EntityGraph(attributePaths = {"writer"})
    Optional<PromotionalPost> findWithWriterById(Long id);
}
