package com.unibave.monorepotrello.repository;

import com.unibave.monorepotrello.model.ListOfCards;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListOfCardsRepository extends JpaRepository<ListOfCards, Long> {

    List<ListOfCards> findByProjectId(Long id);
}
