package com.project.FoodRescue.repository;

import com.project.FoodRescue.model.Claim;
import com.project.FoodRescue.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, UUID> {

    Optional<Claim> findByDonation_DonationId(UUID donationId);

    List<Claim> findAllByVolunteer(User volunteer);

    List<Claim> findAllByVolunteer_UserId(UUID volunteerId);
}
