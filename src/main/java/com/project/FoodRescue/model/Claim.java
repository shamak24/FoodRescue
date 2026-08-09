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
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID claimId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="donation_id", unique = true)
    private Donation donation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="volunteer_id")
    private User volunteer;

    private LocalDateTime claimedAt;

    @Enumerated(EnumType.STRING)
    private ClaimStatus claimStatus;
}
