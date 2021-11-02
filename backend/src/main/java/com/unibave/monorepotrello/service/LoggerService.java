package com.unibave.monorepotrello.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggerService {
  private static final Logger logger = LoggerFactory.getLogger(LoggerService.class);

  public static void logger(String message, Exception exception) {
    logger.error(message + " {}", exception.getMessage());
  }

  public static void logger(String message) {
    logger.error(message);
  }
}
