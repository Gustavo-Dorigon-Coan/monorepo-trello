package com.unibave.monorepotrello.controller;


import com.unibave.monorepotrello.constant.ResourceName;
import com.unibave.monorepotrello.model.Comment;
import com.unibave.monorepotrello.model.Project;
import com.unibave.monorepotrello.repository.CommentRepository;
import com.unibave.monorepotrello.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ResourceName.COMMENT)
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Comment comment){
        commentService.save(comment);
    }

    @GetMapping(value = "/card/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Comment>> findByCardIdOrderByCreatedAtDesc(
            @PathVariable("id") Long id){
        return ResponseEntity.ok().body(commentService.findByCardIdOrderByCreatedAtDesc(id));
    }

}
