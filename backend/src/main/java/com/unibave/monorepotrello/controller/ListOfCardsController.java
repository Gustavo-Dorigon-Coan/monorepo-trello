package com.unibave.monorepotrello.controller;

import com.unibave.monorepotrello.constant.ResourceName;
import com.unibave.monorepotrello.model.ListOfCards;
import com.unibave.monorepotrello.model.User;
import com.unibave.monorepotrello.service.ListOfCardsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(ResourceName.LISTOFCARDS )
public class ListOfCardsController {

    private  final ListOfCardsService listOfCardsService;

    public ListOfCardsController(ListOfCardsService listOfCardsService) {
        this.listOfCardsService = listOfCardsService;
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody ListOfCards listOfCards){
        listOfCardsService.save(listOfCards);
    }

    @GetMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<ListOfCards>> findAll(){
        return ResponseEntity.ok().body(listOfCardsService.findAll());
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public void delete (@PathVariable("id") long id){
        listOfCardsService.delete(id);
    }

    @PutMapping({"/id"})
    @ResponseStatus(HttpStatus.OK)
    public void update(
            @PathVariable("id") Long id,
            @RequestBody ListOfCards listOfCards){
        listOfCardsService.update(id, listOfCards);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Optional<ListOfCards>> findById(
            @PathVariable("id") Long id){
        return ResponseEntity.ok().body(listOfCardsService.findById(id));
    }
}
