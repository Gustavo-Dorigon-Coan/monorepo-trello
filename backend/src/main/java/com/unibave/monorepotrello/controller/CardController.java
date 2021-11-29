package com.unibave.monorepotrello.controller;

import com.unibave.monorepotrello.constant.ResourceName;
import com.unibave.monorepotrello.model.Card;
import com.unibave.monorepotrello.model.ListOfCards;
import com.unibave.monorepotrello.model.Project;
import com.unibave.monorepotrello.service.CardService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{id}/get_project")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Project> getProject(@PathVariable ("id") Long id) {
        return ResponseEntity.ok().body(cardService.findById(id).getListOfCards().getProject());
    }

    @GetMapping("/{id}/get_list")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ListOfCards> getList(@PathVariable ("id") Long id) {
        return ResponseEntity.ok().body(cardService.findById(id).getListOfCards());
    }

    @GetMapping(value = "/user/{userId}/find")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Card>> find(
        @PathVariable(value = "userId") Long userId,
        @RequestParam(value = "startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
        @RequestParam(value = "endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok().body(cardService.find(userId,startDate,endDate));
    }
}


