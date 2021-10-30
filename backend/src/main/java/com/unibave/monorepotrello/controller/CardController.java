package com.unibave.monorepotrello.controller;

import com.unibave.monorepotrello.constant.ResourceName;
import com.unibave.monorepotrello.model.Card;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.unibave.monorepotrello.service.CardService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(ResourceName.CARDS)
public class CardController {

    private final CardService cardService;

    private CardController(CardService cardService){
        this.cardService = cardService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Card card){
        cardService.save(card);
    }

    @GetMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Card>> findAll(){
        return ResponseEntity.ok().body(cardService.findAll());
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public void delete (@PathVariable("id") long id){
        cardService.delete(id);
    }

    @PutMapping({"/id"})
    @ResponseStatus(HttpStatus.OK)
    public void update(
            @PathVariable("id") Long id,
            @RequestBody Card card){
        cardService.update(id, card);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Optional<Card>> findById(
            @PathVariable("id") Long id){
        return ResponseEntity.ok().body(cardService.findById(id));
    }

}

