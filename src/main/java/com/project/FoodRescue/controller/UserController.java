package com.project.FoodRescue.controller;

import com.project.FoodRescue.dto.userLogin.LoginRequest;
import com.project.FoodRescue.dto.userLogin.LoginResponse;
import com.project.FoodRescue.dto.userSignUp.RegisterRequest;
import com.project.FoodRescue.dto.userSignUp.RegisterResponse;
import com.project.FoodRescue.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = userService.login(loginRequest);
        if(response != null){
            return new ResponseEntity<LoginResponse>(response, HttpStatus.OK);
        }else
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/signup")
    public ResponseEntity<RegisterResponse> signUp(@RequestBody RegisterRequest registerRequest){
        RegisterResponse response = userService.signUp(registerRequest);
        if(response != null){
            return new ResponseEntity<RegisterResponse>(response, HttpStatus.OK);
        }else
            return new ResponseEntity<>(HttpStatus.CONFLICT);
    }
}
