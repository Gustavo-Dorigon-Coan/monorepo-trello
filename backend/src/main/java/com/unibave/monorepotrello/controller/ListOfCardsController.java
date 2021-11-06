package com.unibave.monorepotrello.controller;

import com.unibave.monorepotrello.constant.ResourceName;
import com.unibave.monorepotrello.model.ListOfCards;
import com.unibave.monorepotrello.service.ListOfCardsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

}
