package com.unibave.monorepotrello.controller;


import com.unibave.monorepotrello.constant.ResourceName;
import com.unibave.monorepotrello.model.User;
import com.unibave.monorepotrello.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(ResourceName.USERS)
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody User user){
        userService.save(user);
    }

    @GetMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<User>> findAll(){
        return ResponseEntity.ok().body(userService.findAll());
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public void delete (@PathVariable("id") long id){
        userService.delete(id);
    }

    @PutMapping({"/id"})
    @ResponseStatus(HttpStatus.OK)
    public void update(
            @PathVariable("id") Long id,
            @RequestBody User user){
        userService.update(id, user);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Optional<User>> findById(
            @PathVariable("id") Long id){
        return ResponseEntity.ok().body(userService.findById(id));
    }

}
