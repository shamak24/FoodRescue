package com.project.FoodRescue.dto.Donation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationRequest {

    private String foodName;
    private String description;
    private int quantity;
    private String unit;
    private String pickUpLocation;
    private String expiryDate;
    private UUID providerId;
}
