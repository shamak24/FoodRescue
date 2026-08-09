package com.project.FoodRescue.dto.Donation;

import com.project.FoodRescue.model.Status;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
public class DonationResponse {

    private UUID donationId;
    private String foodName;
    private String description;
    private int quantity;
    private String unit;
    private String pickUpLocation;
    private LocalDateTime expiryDate;
    private Status status;
    private UUID providerId;
}
