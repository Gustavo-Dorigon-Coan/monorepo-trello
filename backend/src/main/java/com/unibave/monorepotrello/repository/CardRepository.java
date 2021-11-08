package com.unibave.monorepotrello.repository;

import com.unibave.monorepotrello.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {

    @Modifying
    @Query(value = "update card set card.list_of_cards_id = :listId where card.id = :id", nativeQuery = true)
     void nextList(@Param("id") Long id, @Param("listId") Long listId);

    @Modifying
    @Query(value = "update card set card.done = :done where card.id = :id", nativeQuery = true)
    void setDone(@Param("id") Long id, @Param("done") int done);
}
