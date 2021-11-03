package com.unibave.monorepotrello.security;

import com.unibave.monorepotrello.service.LoggerService;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationEntryPointJwt implements AuthenticationEntryPoint {

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
                       AuthenticationException authenticationException) throws IOException {
    LoggerService.logger("Unauthorized error:", authenticationException);
    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized");
  }
}