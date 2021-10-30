package com.unibave.monorepotrello.repository;

import com.unibave.monorepotrello.model.ListOfCards;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListOfCardsRepository extends JpaRepository<ListOfCards, Long> {
}
