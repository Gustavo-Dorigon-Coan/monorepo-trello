package com.unibave.monorepotrello.service;

import com.unibave.monorepotrello.model.Card;
import com.unibave.monorepotrello.model.ListOfCards;
import com.unibave.monorepotrello.repository.CardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CardService {

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public void save(Card card) {
        cardRepository.save(card);
    }

    public List<Card> findAll() {
        return cardRepository.findAll();
    }

    public void delete(Long id) {
        cardRepository.deleteById(id);
    }

    public void update(Long id, Card card) {
        card.setId(id);
        cardRepository.save(card);
    }

    public Optional<Card> findById(Long id) {
        return cardRepository.findById(id);
    }

    public List<Card> findByListOfCardsId(Long id){
        return cardRepository.findByListOfCardsId(id);
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
}
