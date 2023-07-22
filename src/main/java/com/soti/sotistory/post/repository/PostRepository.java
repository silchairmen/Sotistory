package com.soti.sotistory.post.repository;

import com.soti.sotistory.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
