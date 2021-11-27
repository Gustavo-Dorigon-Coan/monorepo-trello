package com.unibave.monorepotrello.service;

import com.unibave.monorepotrello.model.ListOfCards;
import com.unibave.monorepotrello.repository.ListOfCardsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ListOfCardsService {
    private final ListOfCardsRepository listOfCardsRepository;

    public ListOfCardsService(ListOfCardsRepository listOfCardsRepository) {
        this.listOfCardsRepository = listOfCardsRepository;
    }

    public void save(ListOfCards listOfCards) {
        if (listOfCards.getOrder() == null) {
            Integer maxOrderByProject =
                    listOfCardsRepository.getMaxOrderByProject(listOfCards.getProject().getId());
            listOfCards.setOrder(maxOrderByProject + 1);
        }
        listOfCardsRepository.save(listOfCards);
    }

    public java.util.List<ListOfCards> findAll() {
        return listOfCardsRepository.findAll();
    }

    public void delete(Long id) {
        listOfCardsRepository.deleteById(id);
    }

    public void update(Long id, ListOfCards listOfCards) {
        listOfCards.setId(id);
        listOfCardsRepository.save(listOfCards);
    }

    public Optional<ListOfCards> findById(Long id) {
        return listOfCardsRepository.findById(id);
    }

    @Transactional
    public void changeColor(Long id, String color){
        listOfCardsRepository.changeColor(id, color);
    }

    @Transactional
    public void changeOrder(Long id, int order){
        listOfCardsRepository.changeOrder(id,order);
    }

}

