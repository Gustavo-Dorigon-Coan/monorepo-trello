package com.unibave.monorepotrello.repository;

import com.unibave.monorepotrello.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ProjectRepository extends JpaRepository<Project,Long> {

    List<Project> findByUsersId(Long id);

    @Modifying
    @Query(value = "update project set name = :name where id = :id", nativeQuery = true)
    void renameProject(@Param("id") Long id,@Param("name") String name);
}




