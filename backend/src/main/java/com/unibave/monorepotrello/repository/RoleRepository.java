package com.unibave.monorepotrello.repository;

import com.unibave.monorepotrello.enums.ERole;
import com.unibave.monorepotrello.model.Role;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository  extends JpaRepository<Role, Long> {

  Optional<Role> findByName(ERole name);

}
