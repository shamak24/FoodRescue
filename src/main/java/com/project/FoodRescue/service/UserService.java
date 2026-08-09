package com.project.FoodRescue.service;

import com.project.FoodRescue.dto.userLogin.LoginRequest;
import com.project.FoodRescue.dto.userLogin.LoginResponse;
import com.project.FoodRescue.dto.userSignUp.RegisterRequest;
import com.project.FoodRescue.dto.userSignUp.RegisterResponse;
import com.project.FoodRescue.model.User;
import com.project.FoodRescue.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest loginRequest){

        User user = userRepo.findByUsername(loginRequest.getUsername()).orElse(null);
        if(user == null)
            return null;

        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            return null;
        }
        return new LoginResponse(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );
    }

    public RegisterResponse signUp(RegisterRequest registerRequest){
        if(userRepo.existsByUsername(registerRequest.getUsername())){
            return null;
        }
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(
                passwordEncoder.encode(registerRequest.getPassword())
        );
        user.setRole(registerRequest.getRole());

        userRepo.save(user);
        User savedUser = userRepo.findByUsername(user.getUsername()).orElse(null);
        if(savedUser == null)
            return null;
        else
           return new RegisterResponse(
                savedUser.getUserId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }
}
