package com.project.FoodRescue.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID donationId;

    @Column(nullable = false)
    private String foodName;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private String unit;

    @Column(nullable = false)
    private String pickUpLocation;

    @Column(nullable = false)
    private LocalDateTime expiryDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "provider_id", nullable = false)
    private User provider;
}
