package com.project.FoodRescue.dto.userLogin;

import com.project.FoodRescue.model.Roles;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class LoginResponse {

    private UUID userId;
    private String username;
    private String email;
    private Roles role;
}
