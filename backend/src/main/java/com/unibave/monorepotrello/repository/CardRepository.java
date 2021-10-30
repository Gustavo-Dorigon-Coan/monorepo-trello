package com.unibave.monorepotrello.repository;

import com.unibave.monorepotrello.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
}
