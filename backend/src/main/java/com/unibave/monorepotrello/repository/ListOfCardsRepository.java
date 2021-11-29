package com.unibave.monorepotrello.repository;

import com.unibave.monorepotrello.model.ListOfCards;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ListOfCardsRepository extends JpaRepository<ListOfCards, Long> {

    @Query(value = "select max(list_of_cards.order_sequence) from list_of_cards where list_of_cards.project_id = :id", nativeQuery = true)
    Integer getMaxOrderByProject(@Param("id") Long id);

    List<ListOfCards> findByProjectId(Long id);

    void deleteByProjectId(Long id);

    @Modifying
    @Query(value = "update list_of_cards set color = :color where id = :id", nativeQuery = true)
    void changeColor(@Param("id") Long id, @Param("color") String color);

    @Modifying
    @Query(value = "update list_of_cards set order_sequence = :order where id = :id", nativeQuery = true)
    void changeOrder(@Param("id") Long id, @Param("order") Integer order);

    List<ListOfCards> findAllByProjectId(Long id);
}
