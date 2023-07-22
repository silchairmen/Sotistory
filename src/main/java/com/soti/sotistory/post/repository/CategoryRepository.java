package com.soti.sotistory.post.repository;

import com.soti.sotistory.post.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
