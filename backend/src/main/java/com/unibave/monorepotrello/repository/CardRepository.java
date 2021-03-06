package com.unibave.monorepotrello.repository;

import com.unibave.monorepotrello.model.Card;
import com.unibave.monorepotrello.model.ListOfCards;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CardRepository extends JpaRepository<Card, Long> {

  @Modifying
  @Query(value = "update card set card.list_of_cards_id = :listId where card.id = :id", nativeQuery = true)
  void nextList(@Param("id") Long id, @Param("listId") Long listId);

  @Modifying
  @Query(value = "update card set card.done = :done where card.id = :id", nativeQuery = true)
  void setDone(@Param("id") Long id, @Param("done") int done);

  void deleteByListOfCardsId(Long id);

  @Query(value = "select card.id, card.description, card.done, card.list_of_cards_id, " +
      "card.scheduled_date, card.title " +
    "from card, list_of_cards, user_project " +
    "where card.list_of_cards_id = list_of_cards.id " +
    "and list_of_cards.project_id = user_project.project_id " +
    "and user_project.user_id = :userId " +
    "and card.scheduled_date between :startDate and :endDate", nativeQuery = true)
  List<Card> find(
    @Param("userId") Long userId,
    @Param("startDate") LocalDate startDate,
    @Param("endDate") LocalDate endDate);

  List<Card> findAllByListOfCardsId(Long id);
}
