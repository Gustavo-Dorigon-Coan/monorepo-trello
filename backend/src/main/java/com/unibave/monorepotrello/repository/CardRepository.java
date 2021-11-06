package com.unibave.monorepotrello.repository;

import com.unibave.monorepotrello.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {

    List<Card> findByListOfCardsId(Long id);
}
