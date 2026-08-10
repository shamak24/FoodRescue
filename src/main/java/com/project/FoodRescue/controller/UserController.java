package com.project.FoodRescue.controller;

import com.project.FoodRescue.dto.userLogin.LoginRequest;
import com.project.FoodRescue.dto.userLogin.LoginResponse;
import com.project.FoodRescue.dto.userSignUp.RegisterRequest;
import com.project.FoodRescue.dto.userSignUp.RegisterResponse;
import com.project.FoodRescue.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

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


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response) {
        try {
            LoginResponse loginResponse =
                    userService.login(
                            loginRequest,
                            request,
                            response
                    );
            return ResponseEntity.ok(loginResponse);

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(
            @RequestBody RegisterRequest registerRequest) {
        try {
            RegisterResponse response =
                    userService.signUp(registerRequest);

            if (response != null) {
                return new ResponseEntity<>(
                        response,
                        HttpStatus.CREATED
                );
            }
            return new ResponseEntity<>(
                    "Username or email already exists",
                    HttpStatus.CONFLICT
            );

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}