package com.unibave.monorepotrello.repository;

import com.unibave.monorepotrello.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository  extends JpaRepository<Role, Long> {
}
