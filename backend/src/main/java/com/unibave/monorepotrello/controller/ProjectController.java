package com.unibave.monorepotrello.controller;


import com.unibave.monorepotrello.constant.ResourceName;
import com.unibave.monorepotrello.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.unibave.monorepotrello.model.Project;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(ResourceName.PROJECTS)
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Project project){
        projectService.save(project);
    }

    @GetMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Project>> findAll(){
        return ResponseEntity.ok().body(projectService.findAll());
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public void delete (@PathVariable("id") long id){
        projectService.delete(id);
    }

    @PutMapping({"/id"})
    @ResponseStatus(HttpStatus.OK)
    public void update(
            @PathVariable("id") Long id,
            @RequestBody Project project){
        projectService.update(id, project);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Optional<Project>> findById(
            @PathVariable("id") Long id){
        return ResponseEntity.ok().body(projectService.findById(id));
    }
}
