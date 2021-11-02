package com.unibave.monorepotrello.security;

import com.unibave.monorepotrello.service.LoggerService;
import com.unibave.monorepotrello.service.UserDetailsProvider;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {

  private final String jwtSecret = "secret";

  public String generateJwtToken(Authentication authentication) {
    UserDetailsProvider user = (UserDetailsProvider) authentication.getPrincipal();

    return Jwts.builder()
        .setSubject(user.getUsername())
        .setIssuedAt(new Date())
        .setExpiration(new Date(new Date().getTime() + 86400000))
        .signWith(SignatureAlgorithm.HS512, jwtSecret)
        .compact();
  }

  public String getUsernameFromJwtToken(String token) {
    return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validateJwtToken(String token) {
    try {
      Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
      return true;
    } catch (SignatureException e) {
      LoggerService.logger("Invalid JWT signature:", e);
    } catch (MalformedJwtException e) {
      LoggerService.logger("Invalid JWT token:", e);
    } catch (ExpiredJwtException e) {
      LoggerService.logger("JWT token is expired:", e);
    } catch (UnsupportedJwtException e) {
      LoggerService.logger("JWT token is unsupported:", e);
    } catch (IllegalArgumentException e) {
      LoggerService.logger("JWT claims string is empty:", e);
    }

    return false;
  }
}