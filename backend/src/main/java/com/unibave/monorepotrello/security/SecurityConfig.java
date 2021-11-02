package com.unibave.monorepotrello.security;

import com.unibave.monorepotrello.constant.ResourceName;
import com.unibave.monorepotrello.service.UserDetailsServiceProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.Filter;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  private final CorsConfiguration configuration = new CorsConfiguration();
  private final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

  private final AuthenticationEntryPointJwt unauthorizedHeader;
  private final UserDetailsServiceProvider userDetailsServiceProvider;

  public SecurityConfig(AuthenticationEntryPointJwt unauthorizedHeader,
                        UserDetailsServiceProvider userDetailsServiceProvider) {
    this.unauthorizedHeader = unauthorizedHeader;
    this.userDetailsServiceProvider = userDetailsServiceProvider;
  }

  @Override
  public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
    authenticationManagerBuilder.userDetailsService(userDetailsServiceProvider).passwordEncoder(passwordEncoder());
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public Filter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    configuration.setAllowedOrigins(List.of("http://localhost:3000"));
    configuration.setAllowedMethods(List.of("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH"));
    configuration.setAllowCredentials(true);
    configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-type"));

    source.registerCorsConfiguration("/**", configuration);

    return source;
  }

  @Override
  public void configure(HttpSecurity http) throws Exception {
    http.cors().and().csrf().disable()
        .exceptionHandling().authenticationEntryPoint(unauthorizedHeader).and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
        .authorizeRequests().antMatchers( ResourceName.AUTH+"/**").permitAll()
        .anyRequest().authenticated();

    http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
  }
}
