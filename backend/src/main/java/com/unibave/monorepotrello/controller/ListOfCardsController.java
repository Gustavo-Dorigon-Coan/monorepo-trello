package com.unibave.monorepotrello.controller;

import com.unibave.monorepotrello.constant.ResourceName;
import com.unibave.monorepotrello.model.ListOfCards;
import com.unibave.monorepotrello.service.ListOfCardsService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ResourceName.LIST_OF_CARDS )
public class ListOfCardsController {

    private final ListOfCardsService listOfCardsService;

    public ListOfCardsController(ListOfCardsService listOfCardsService) {
        this.listOfCardsService = listOfCardsService;
    }

    @GetMapping(value = "/project/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<ListOfCards>> findByProjectId(
        @PathVariable("id") Long id){
        return ResponseEntity.ok().body(listOfCardsService.findByProjectId(id));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody ListOfCards listOfCards){
        listOfCardsService.save(listOfCards);
    }

    @PatchMapping(value = "/change_color/{id}", consumes = MediaType.TEXT_PLAIN_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void changeColor(@PathVariable("id") Long id, @RequestBody String color){
        listOfCardsService.changeColor(id, color);
    }

    @PatchMapping(value = "/order_up/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void orderUp(@PathVariable("id") Long id){
        listOfCardsService.orderUp(id);
    }

    @PatchMapping(value = "/order_down/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void orderDown(@PathVariable("id") Long id){
        listOfCardsService.orderDown(id);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id")Long id){
        listOfCardsService.delete(id);
    }
}
