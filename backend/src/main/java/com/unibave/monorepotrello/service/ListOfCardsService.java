package com.unibave.monorepotrello.service;

import com.unibave.monorepotrello.model.ListOfCards;
import com.unibave.monorepotrello.repository.ListOfCardsRepository;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ListOfCardsService {
    private final ListOfCardsRepository listOfCardsRepository;
    private final CardService cardService;

    public ListOfCardsService(ListOfCardsRepository listOfCardsRepository,
                              CardService cardService) {
        this.listOfCardsRepository = listOfCardsRepository;
        this.cardService = cardService;
    }

    public void save(ListOfCards listOfCards) {
        if (listOfCards.getOrder() == null) {
            Integer maxOrderByProject =
                listOfCardsRepository.getMaxOrderByProject(listOfCards.getProject().getId());
            listOfCards.setOrder(maxOrderByProject + 1);
        }
        listOfCardsRepository.save(listOfCards);
    }

    public void delete(Long id) {
        cardService.deleteByListOfCardsId(id);
        listOfCardsRepository.deleteById(id);
    }

    public void deleteByProjectId(Long id) {
        List<ListOfCards> allByProjectId = listOfCardsRepository.findAllByProjectId(id);
        allByProjectId.forEach(listOfCards -> {
            cardService.deleteByListOfCardsId(listOfCards.getId());
        });
        listOfCardsRepository.deleteByProjectId(id);
    }

    public List<ListOfCards> findByProjectId(Long id){
        return listOfCardsRepository.findByProjectId(id);
    }

    @Transactional
    public void changeColor(Long id, String color){
        listOfCardsRepository.changeColor(id, color);
    }

    @Transactional
    public void orderUp(Long id){
        ListOfCards listUp = listOfCardsRepository.findById(id).get();
        List<ListOfCards> lists = listOfCardsRepository.findAllByProjectId(listUp.getProject().getId());
        lists.forEach(list -> {
            if (listUp.getOrder() - 1 == list.getOrder()) {
                listOfCardsRepository.changeOrder(list.getId(), list.getOrder() + 1);
            }
        });
        listOfCardsRepository.changeOrder(id, listUp.getOrder() - 1);
    }

    @Transactional
    public void orderDown(Long id){
        ListOfCards listUp = listOfCardsRepository.findById(id).get();
        List<ListOfCards> lists = listOfCardsRepository.findAllByProjectId(listUp.getProject().getId());
        AtomicReference<Boolean> isTheLast = new AtomicReference<>(true);
        lists.forEach(list -> {
            if (listUp.getOrder() + 1 == list.getOrder()) {
                listOfCardsRepository.changeOrder(list.getId(), list.getOrder() - 1);
                isTheLast.set(false);
            }
        });
        if (!isTheLast.get()) {
            listOfCardsRepository.changeOrder(id, listUp.getOrder() + 1);
        }
    }

}

