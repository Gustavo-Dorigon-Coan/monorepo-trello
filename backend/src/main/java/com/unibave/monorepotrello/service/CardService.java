package com.unibave.monorepotrello.service;

import com.unibave.monorepotrello.model.Card;
import com.unibave.monorepotrello.model.ListOfCards;
import com.unibave.monorepotrello.repository.CardRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public void delete(Long id) {
        commentService.deleteAllByCardId(id);
        cardRepository.deleteById(id);
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

    @Transactional
    public void deleteByListOfCardsId(Long id) {
        List<Card> allByListOfCardsId = cardRepository.findAllByListOfCardsId(id);
        allByListOfCardsId.forEach(card -> {
            commentService.deleteAllByCardId(card.getId());
        });
        cardRepository.deleteByListOfCardsId(id);
    }

    public List<Card> find(Long userId, LocalDate startDate, LocalDate endDate) {
        return cardRepository.find(userId,startDate,endDate);
    }

    public Card findById(Long id) {
        return cardRepository.findById(id).get();
    }
}
