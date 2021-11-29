package com.unibave.monorepotrello.service;

import com.unibave.monorepotrello.model.Card;
import com.unibave.monorepotrello.model.ListOfCards;
import com.unibave.monorepotrello.repository.CardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CardService {

    private final CardRepository cardRepository;
    private final CommentService commentService;

    public CardService(CardRepository cardRepository, CommentService commentService) {
        this.cardRepository = cardRepository;
        this.commentService = commentService;
    }

    public void save(Card card) {
        cardRepository.save(card);
    }

    public List<Card> findAll() {
        return cardRepository.findAll();
    }

    public void delete(Long id) {
        commentService.deleteAllByCardId(id);
        cardRepository.deleteById(id);
    }

    public void update(Long id, Card card) {
        card.setId(id);
        cardRepository.save(card);
    }

    public Optional<Card> findById(Long id) {
        return cardRepository.findById(id);
    }

    @Transactional
    public void nextList(Long id, ListOfCards listOfCards) {
        cardRepository.nextList(id, listOfCards.getId());
    }

    @Transactional
    public void setDone(Long id, Boolean done) {
        if (done) {
            cardRepository.setDone(id,1);
        } else {
            cardRepository.setDone(id,0);
        }
    }

    public List<Card> find(Long userId, LocalDate startDate, LocalDate endDate) {
        return cardRepository.find(userId,startDate,endDate);
    }
}
