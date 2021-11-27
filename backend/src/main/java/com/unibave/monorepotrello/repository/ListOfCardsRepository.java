package com.unibave.monorepotrello.repository;

import com.unibave.monorepotrello.model.ListOfCards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ListOfCardsRepository extends JpaRepository<ListOfCards, Long> {

    @Query(value = "update listOfCards set listOfCards.color = :color where listOfCards.id = :id", nativeQuery = true)
    void changeColor(@Param("id") Long id, @Param("color") String color);

    @Query(value = "update listOfCards set listOfCards.order = :order where listOfCards.id = :id", nativeQuery = true)
    void changeOrder(Long id, int order);
}
