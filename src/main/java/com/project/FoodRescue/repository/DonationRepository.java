package com.project.FoodRescue.repository;

import com.project.FoodRescue.model.Donation;
import com.project.FoodRescue.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DonationRepository extends JpaRepository<Donation, UUID> {
    Optional<Donation> findByDonationId(UUID donationId);

    @Query("SELECT d FROM Donation d WHERE d.status = 'AVAILABLE' AND d.expiryDate > CURRENT_TIMESTAMP")
    List<Donation> findAllAvailableDonations();

    List<Donation> findAllByProvider(User provider);
}
