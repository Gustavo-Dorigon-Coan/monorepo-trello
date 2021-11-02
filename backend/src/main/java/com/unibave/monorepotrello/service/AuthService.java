package com.unibave.monorepotrello.service;

import com.unibave.monorepotrello.enums.ERole;
import com.unibave.monorepotrello.model.Role;
import com.unibave.monorepotrello.model.User;
import com.unibave.monorepotrello.payload.request.LoginRequest;
import com.unibave.monorepotrello.payload.request.SignupRequest;
import com.unibave.monorepotrello.payload.response.JwtResponse;
import com.unibave.monorepotrello.payload.response.MessageResponse;
import com.unibave.monorepotrello.repository.RoleRepository;
import com.unibave.monorepotrello.repository.UserRepository;
import com.unibave.monorepotrello.security.JwtUtils;
import java.util.ArrayList;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder encoder;
  private final AuthenticationManager authenticationManager;
  private final JwtUtils jwtUtils;

  public AuthService(UserRepository userRepository, RoleRepository roleRepository,
                     PasswordEncoder encoder,
                     AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.encoder = encoder;
    this.authenticationManager = authenticationManager;
    this.jwtUtils = jwtUtils;
  }

  public ResponseEntity<JwtResponse> authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetailsProvider userDetailsProvider = (UserDetailsProvider) authentication.getPrincipal();
    List<String> roles = userDetailsProvider.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponse(jwt,
        userDetailsProvider.getId(),
        userDetailsProvider.getUsername(),
        userDetailsProvider.getEmail(),
        roles));
  }

  public ResponseEntity<MessageResponse> registerUser(SignupRequest signUpRequest) {
    if (existsUser(signUpRequest)) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: O nome/email já esta em uso!"));
    };

    User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
        encoder.encode(signUpRequest.getPassword()));

    user.setRoles(getRoles(signUpRequest));
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("Usuário registrado com sucesso!"));
  }

  private List<Role> getRoles(SignupRequest signUpRequest) {
    List<Role> roles = new ArrayList<>();

    if (signUpRequest.getRole() == null) {
      roles.add(verifyRole(ERole.ROLE_USER));
    } else {
      signUpRequest.getRole().forEach(role -> {
        if (role.equals(ERole.ROLE_ADMIN)) {
          roles.add(verifyRole(ERole.ROLE_ADMIN));
        } else {
          roles.add(verifyRole(ERole.ROLE_USER));
        }
      });
    }

    return roles;
  }

  private Role verifyRole(ERole roleUser) {
    return roleRepository.findByName(roleUser)
        .orElseThrow(() -> new RuntimeException("Error: A função não foi encontrada!"));
  }

  private boolean existsUser(SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) return true;
    return userRepository.existsByEmail(signUpRequest.getEmail());
  }

}