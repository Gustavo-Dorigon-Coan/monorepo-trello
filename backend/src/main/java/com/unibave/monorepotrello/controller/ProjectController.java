package com.unibave.monorepotrello.controller;

import com.unibave.monorepotrello.constant.ResourceName;
import com.unibave.monorepotrello.model.Project;
import com.unibave.monorepotrello.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ResourceName.PROJECTS)
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping(value = "/user/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Project>> findByUserId(
            @PathVariable("id") Long id){
        return ResponseEntity.ok().body(projectService.findByUserId(id));
    }

    @GetMapping(value = "/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Project> findById(
        @PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok().body(projectService.findById(id).orElseThrow(
            () -> new Exception("Project not found - " + id)
        ));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Project project){
        projectService.save(project);
    }

    @PatchMapping(value = "/edit-list/{id}", consumes = MediaType.TEXT_PLAIN_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void renameProject(@PathVariable("id") Long id,@RequestBody String name){
        projectService.renameProject(id,name);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable ("id")Long id){
        projectService.delete(id);
    }
  
}