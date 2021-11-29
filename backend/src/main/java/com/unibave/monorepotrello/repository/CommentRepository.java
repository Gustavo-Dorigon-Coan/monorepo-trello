package com.unibave.monorepotrello.repository;

import com.unibave.monorepotrello.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByCardIdOrderByCreatedAtDesc (Long id);

    void deleteAllByCardId(Long id);
}
