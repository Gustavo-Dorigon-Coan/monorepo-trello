package com.unibave.monorepotrello.controller;

import com.unibave.monorepotrello.constant.ResourceName;
import com.unibave.monorepotrello.model.Card;
import com.unibave.monorepotrello.model.ListOfCards;
import com.unibave.monorepotrello.service.CardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(ResourceName.CARDS)
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService){
        this.cardService = cardService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Card card){
        cardService.save(card);
    }

    @PatchMapping(value = "/next-list/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void nextList(@PathVariable("id") Long id, @RequestBody ListOfCards listOfCards){
        cardService.nextList(id, listOfCards);
    }

    @PatchMapping(value = "/set-done/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void setDone(@PathVariable("id") Long id, @RequestBody Boolean done){
        cardService.setDone(id, done);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable ("id") Long id){
        cardService.delete(id);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody Card card){
        cardService.save(card);
    }
}


