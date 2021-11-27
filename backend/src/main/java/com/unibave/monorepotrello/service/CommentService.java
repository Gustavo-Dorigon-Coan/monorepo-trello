package com.unibave.monorepotrello.service;

import com.unibave.monorepotrello.model.Card;
import com.unibave.monorepotrello.model.Comment;
import com.unibave.monorepotrello.model.Project;
import com.unibave.monorepotrello.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public void save(Comment comment) {
        commentRepository.save(comment);
    }
    public List<Comment> findByCardIdOrderByCreatedAtDesc(Long id){
        return commentRepository.findByCardIdOrderByCreatedAtDesc(id);
    }

    public void deleteAllByCardId(Long id){
        commentRepository.deleteAllByCardId(id);
    }
}
