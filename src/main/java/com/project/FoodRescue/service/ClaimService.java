package com.project.FoodRescue.service;

import com.project.FoodRescue.model.Claim;
import com.project.FoodRescue.model.ClaimStatus;
import com.project.FoodRescue.model.Donation;
import com.project.FoodRescue.model.Status;
import com.project.FoodRescue.model.User;
import com.project.FoodRescue.repository.ClaimRepository;
import com.project.FoodRescue.repository.DonationRepository;
import com.project.FoodRescue.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClaimService {

    private final ClaimRepository claimRepo;
    private final DonationRepository donationRepo;
    private final UserRepository userRepo;

    public Claim claimDonation(UUID donationId) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String username = null;
        if (authentication != null) {
            username = authentication.getName();
        }

        User volunteer = userRepo.findByUsername(username)
                .orElseThrow(
                        () -> new RuntimeException("User not found")
                );


        Donation donation = donationRepo.findById(donationId)
                .orElseThrow(
                        () -> new RuntimeException("Donation not found")
                );


        if (donation.getStatus() != Status.AVAILABLE) {
            throw new RuntimeException(
                    "Donation is not available for claiming"
            );
        }


        if (claimRepo.findByDonation_DonationId(donationId)
                .isPresent()) {

            throw new RuntimeException(
                    "Donation has already been claimed"
            );
        }


        Claim claim = new Claim();

        claim.setDonation(donation);
        claim.setVolunteer(volunteer);
        claim.setClaimedAt(LocalDateTime.now());
        claim.setClaimStatus(ClaimStatus.CLAIMED);

        donation.setStatus(Status.CLAIMED);

        donationRepo.save(donation);

        return claimRepo.save(claim);
    }

    public List<Claim> getMyClaims() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();

        User volunteer = userRepo.findByUsername(username)
                .orElseThrow(
                        () -> new RuntimeException("User not found")
                );

        return claimRepo.findAllByVolunteer_UserId(
                volunteer.getUserId()
        );
    }

    public Claim getClaimById(UUID claimId) {

        return claimRepo.findById(claimId)
                .orElseThrow(
                        () -> new RuntimeException("Claim not found")
                );
    }
}