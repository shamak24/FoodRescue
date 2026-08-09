package com.project.FoodRescue.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

    @GetMapping("/auth/login")
    public ResponseEntity<String> login(){
        return new ResponseEntity<>("Logged in!!!",HttpStatus.OK);
    }

    @PostMapping("/auth/signUp")
    public ResponseEntity<String> signUp(){
        return new ResponseEntity<>("Signed in!!!",HttpStatus.OK);
    }

    @GetMapping("/auth/find")
    public ResponseEntity<String> findUser(){
        return new ResponseEntity<>("Found !!!",HttpStatus.OK);
    }
}
