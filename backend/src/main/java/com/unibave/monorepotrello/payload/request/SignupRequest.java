package com.unibave.monorepotrello.payload.request;

import com.unibave.monorepotrello.enums.ERole;
import java.util.List;

public class SignupRequest {
  private String username;

  private String email;

  private List<ERole> role;

  private String password;

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public List<ERole> getRole() {
    return this.role;
  }

  public void setRole(List<ERole> role) {
    this.role = role;
  }
}
