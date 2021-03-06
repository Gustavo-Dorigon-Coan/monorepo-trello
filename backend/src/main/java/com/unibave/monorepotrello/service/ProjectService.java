package com.unibave.monorepotrello.service;

import com.unibave.monorepotrello.model.Project;
import com.unibave.monorepotrello.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ListOfCardsService listOfCardsService;

    public ProjectService(ProjectRepository projectRepository,
                          ListOfCardsService listOfCardsService) {
        this.projectRepository = projectRepository;
        this.listOfCardsService = listOfCardsService;
    }

    public void save(Project project) {
        Project projectSaved = projectRepository.save(project);
        if (!projectSaved.getListOfCards().isEmpty()) {
            projectSaved.getListOfCards().forEach(listOfCards -> {
                listOfCards.setProject(projectSaved);
                listOfCardsService.save(listOfCards);
            });
        }
    }

    @Transactional
    public void delete(Long id) {
        listOfCardsService.deleteByProjectId(id);
        projectRepository.deleteAllById(id);
    }

    public List<Project>findByUserId(Long id){
        return projectRepository.findByUsersId(id);
    }

    public Optional<Project> findById(Long id) {
        return projectRepository.findById(id);
    }

    @Transactional
    public void renameProject(Long id, String name){
        projectRepository.renameProject(id,name);
    }

  public Long getListConcludedId(Long id) {
        return projectRepository.getListConcludedId(id);
  }
}

