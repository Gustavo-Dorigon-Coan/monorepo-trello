package com.unibave.monorepotrello.service;

import com.unibave.monorepotrello.model.Role;
import com.unibave.monorepotrello.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public void save(Role role) {
        roleRepository.save(role);
    }

    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    public void delete(Long id) {
        roleRepository.deleteById(id);
    }

    public void update(Long id, Role role) {
        role.setId(id);
        roleRepository.save(role);
    }

    public Optional<Role> findById(Long id) {
        return roleRepository.findById(id);
    }
}

