package com.unibave.monorepotrello.service;

import com.unibave.monorepotrello.model.Project;
import com.unibave.monorepotrello.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public void save(Project project) {
        projectRepository.save(project);
    }

    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    public void delete(Long id) {
        projectRepository.deleteById(id);
    }

    public List<Project>findByUserId(Long id){
        return projectRepository.findByUsersId(id);
    }

    public void update(Long id, Project project) {
        project.setId(id);
        projectRepository.save(project);
    }

    public Optional<Project> findById(Long id) {
        return projectRepository.findById(id);
    }
}

