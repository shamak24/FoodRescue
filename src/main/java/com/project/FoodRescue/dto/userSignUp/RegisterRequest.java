package com.project.FoodRescue.dto.userSignUp;

import com.project.FoodRescue.model.Roles;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class RegisterRequest {

    private String username;
    private String email;
    private String password;
    private Roles role;
}
