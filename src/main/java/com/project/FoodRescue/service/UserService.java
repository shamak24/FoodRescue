package com.project.FoodRescue.service;

import com.project.FoodRescue.dto.userLogin.LoginRequest;
import com.project.FoodRescue.dto.userLogin.LoginResponse;
import com.project.FoodRescue.dto.userSignUp.RegisterResponse;
import com.project.FoodRescue.dto.userSignUp.RegisterRequest;
import com.project.FoodRescue.model.User;
import com.project.FoodRescue.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authManager;

    private final SecurityContextRepository securityContextRepository =
            new HttpSessionSecurityContextRepository();


    public LoginResponse login(
            LoginRequest loginRequest,
            HttpServletRequest request,
            HttpServletResponse response) {

        Authentication authentication =
                authManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.getUsername(),
                                loginRequest.getPassword()
                        )
                );

        SecurityContext context =
                SecurityContextHolder.createEmptyContext();

        context.setAuthentication(authentication);

        SecurityContextHolder.setContext(context);
        securityContextRepository.saveContext(
                context,
                request,
                response
        );

        Optional<User> user =
                userRepo.findByUsername(
                        loginRequest.getUsername()
                );

        User loggedInUser = user.orElseThrow(
                () -> new RuntimeException("User not found")
        );

        return new LoginResponse(
                loggedInUser.getUserId(),
                loggedInUser.getUsername(),
                loggedInUser.getEmail(),
                loggedInUser.getRole()
        );
    }

    public RegisterResponse signUp(
            RegisterRequest registerRequest) {
        if (userRepo.findByUsername(
                registerRequest.getUsername()
        ).isPresent()) {
            return null;
        }

        User user = new User();

        user.setUsername(
                registerRequest.getUsername()
        );

        user.setEmail(
                registerRequest.getEmail()
        );

        user.setPassword(
                passwordEncoder.encode(
                        registerRequest.getPassword()
                )
        );

        user.setRole(
                registerRequest.getRole()
        );

        User savedUser = userRepo.save(user);

        return new RegisterResponse(
                savedUser.getUserId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }
}