package com.unibave.monorepotrello.controller;

import com.unibave.monorepotrello.constant.ResourceName;
import com.unibave.monorepotrello.payload.request.LoginRequest;
import com.unibave.monorepotrello.payload.request.SignupRequest;
import com.unibave.monorepotrello.payload.response.JwtResponse;
import com.unibave.monorepotrello.payload.response.MessageResponse;
import com.unibave.monorepotrello.service.AuthService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ResourceName.AUTH)
public class AuthController {

  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping(value = "/validate-token", consumes = MediaType.TEXT_PLAIN_VALUE)
  public boolean authenticateUser(@RequestBody String token) {
    return authService.validateJwtToken(token);
  }

  @PostMapping("/sign")
  public ResponseEntity<JwtResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
    return authService.authenticateUser(loginRequest);
  }

  @PostMapping("/signup")
  public ResponseEntity<MessageResponse> registerUser(@RequestBody SignupRequest signUpRequest) {
    return authService.registerUser(signUpRequest);
  }
}
