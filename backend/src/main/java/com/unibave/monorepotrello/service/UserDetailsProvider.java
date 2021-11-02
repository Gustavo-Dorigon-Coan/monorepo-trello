package com.unibave.monorepotrello.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unibave.monorepotrello.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class UserDetailsProvider implements UserDetails {
  private static final long serialVersionUID = 1l;
  private long id;
  private String username;
  private String email;

  @JsonIgnore
  private String password;
  private Collection<? extends GrantedAuthority> authorities;

  public static UserDetailsProvider build(User user) {
    List<GrantedAuthority> authorities = user.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
        .collect(Collectors.toList());

    return new UserDetailsProvider(
        user.getId(),
        user.getUsername(),
        user.getEmail(),
        user.getPassword(),
        authorities
    );
  }

  public UserDetailsProvider(long id, String username, String email, String password, Collection<? extends GrantedAuthority> authorities) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
  }

  @Override
  public boolean equals(Object object) {
    if (this == object) return true;

    if (object == null || getClass() != object.getClass()) return false;

    UserDetailsProvider user = (UserDetailsProvider) object;

    return Objects.equals(id, user.id);
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public long getId() {
    return id;
  }

  @Override
  public String getUsername() {
    return username;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }
}