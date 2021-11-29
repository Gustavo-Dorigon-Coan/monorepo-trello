package com.unibave.monorepotrello.service;

import com.unibave.monorepotrello.model.Role;
import com.unibave.monorepotrello.repository.RoleRepository;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public void save(Role role) {
        roleRepository.save(role);
    }
}

