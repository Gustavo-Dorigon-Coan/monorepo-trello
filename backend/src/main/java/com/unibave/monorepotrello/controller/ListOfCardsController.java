package com.unibave.monorepotrello.controller;

import com.unibave.monorepotrello.constant.ResourceName;
import com.unibave.monorepotrello.model.ListOfCards;
import com.unibave.monorepotrello.service.ListOfCardsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ResourceName.LIST_OF_CARDS )
public class ListOfCardsController {

    private final ListOfCardsService listOfCardsService;

    public ListOfCardsController(ListOfCardsService listOfCardsService) {
        this.listOfCardsService = listOfCardsService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody ListOfCards listOfCards){
        listOfCardsService.save(listOfCards);
    }

    @PatchMapping(value = "/change_color/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public void changeColor(@PathVariable("id") Long id, @RequestBody String color){
        listOfCardsService.changeColor(id, color);
    }

    @PatchMapping(value = "/change_order/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public void changeOrder(@PathVariable("id") Long id, @RequestBody int order){
        listOfCardsService.changeOrder(id, order);
    }


}
