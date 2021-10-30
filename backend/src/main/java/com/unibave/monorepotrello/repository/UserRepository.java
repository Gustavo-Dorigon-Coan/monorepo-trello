package com.unibave.monorepotrello.repository;

import com.unibave.monorepotrello.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
