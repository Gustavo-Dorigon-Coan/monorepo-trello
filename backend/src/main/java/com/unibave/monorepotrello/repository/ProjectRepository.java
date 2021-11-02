package com.unibave.monorepotrello.repository;

import com.unibave.monorepotrello.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ProjectRepository extends JpaRepository<Project,Long> {

    List<Project> findByUsersId(Long id);
}




