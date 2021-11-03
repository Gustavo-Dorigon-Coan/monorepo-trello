package com.unibave.monorepotrello.security;


import com.unibave.monorepotrello.service.LoggerService;
import com.unibave.monorepotrello.service.UserDetailsServiceProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Service
public class AuthTokenFilter extends OncePerRequestFilter {

  private final JwtUtils jwtUtils;
  private final UserDetailsServiceProvider userDetailsServiceProvider;

  public AuthTokenFilter(JwtUtils jwtUtils,
                         UserDetailsServiceProvider userDetailsServiceProvider) {
    this.jwtUtils = jwtUtils;
    this.userDetailsServiceProvider = userDetailsServiceProvider;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws IOException, ServletException {
    try {
      filterInternal(request);
    } catch (Exception e) {
      LoggerService.logger("Cannot set user authentication:", e);
    }

    filterChain.doFilter(request, response);
  }

  private void filterInternal(HttpServletRequest request) {
    String jwt = parserJwt(request);

    if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
      String username = jwtUtils.getUsernameFromJwtToken(jwt);
      UserDetails userDetails = userDetailsServiceProvider.loadUserByUsername(username);
      UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
      authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
      SecurityContextHolder.getContext().setAuthentication(authentication);
    }
  }

  private String parserJwt(HttpServletRequest request) {
    String headerAuth = request.getHeader("Authorization");

    if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
      return headerAuth.substring(7, headerAuth.length());
    }

    return null;
  }
}