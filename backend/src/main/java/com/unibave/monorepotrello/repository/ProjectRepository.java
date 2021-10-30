package com.unibave.monorepotrello.repository;

import com.unibave.monorepotrello.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project,Long> {
}
