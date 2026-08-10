package com.project.FoodRescue.service;

import com.project.FoodRescue.dto.Donation.DonationRequest;
import com.project.FoodRescue.dto.Donation.DonationResponse;
import com.project.FoodRescue.model.Donation;
import com.project.FoodRescue.model.Roles;
import com.project.FoodRescue.model.Status;
import com.project.FoodRescue.model.User;
import com.project.FoodRescue.repository.DonationRepository;
import com.project.FoodRescue.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepo;
    @Autowired
    private UserRepository userRepo;

    public DonationResponse createDonation(DonationRequest donationRequest){
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String username = authentication.getName();

        Optional<User> provider = userRepo.findByUsername(username);
        if(provider.isEmpty()){
            throw new RuntimeException("User not found");
        }
        if (provider.get().getRole() != Roles.PROVIDER) {
            throw new RuntimeException(
                    "Only providers can create donations"
            );
        }
        Donation donation = new Donation();

        donation.setFoodName(donationRequest.getFoodName());
        donation.setDescription(donationRequest.getDescription());
        donation.setQuantity(donationRequest.getQuantity());
        donation.setUnit(donationRequest.getUnit());
        donation.setPickUpLocation(donationRequest.getPickUpLocation());
        donation.setExpiryDate(LocalDateTime.parse(donationRequest.getExpiryDate()));
        donation.setStatus(Status.AVAILABLE);
        donation.setProvider(provider.get());

        Donation savedDonation = donationRepo.save(donation);
        return new DonationResponse(
                savedDonation.getDonationId(),
                savedDonation.getFoodName(),
                savedDonation.getDescription(),
                savedDonation.getQuantity(),
                savedDonation.getUnit(),
                savedDonation.getPickUpLocation(),
                savedDonation.getExpiryDate(),
                savedDonation.getStatus(),
                savedDonation.getProvider().getUserId(),
                savedDonation.getProvider().getUsername()
        );
    }

    public List<DonationResponse> getAvailableDonations(){
        return donationRepo.findAllAvailableDonations().stream()
                .map(donation -> new DonationResponse(
                        donation.getDonationId(),
                        donation.getFoodName(),
                        donation.getDescription(),
                        donation.getQuantity(),
                        donation.getUnit(),
                        donation.getPickUpLocation(),
                        donation.getExpiryDate(),
                        donation.getStatus(),
                        donation.getProvider().getUserId(),
                        donation.getProvider().getUsername()
                ))
                .toList();
    }

    public DonationResponse getDonationById(UUID id){
        return donationRepo.findByDonationId(id).map(donation -> new DonationResponse(
                donation.getDonationId(),
                donation.getFoodName(),
                donation.getDescription(),
                donation.getQuantity(),
                donation.getUnit(),
                donation.getPickUpLocation(),
                donation.getExpiryDate(),
                donation.getStatus(),
                donation.getProvider().getUserId(),
                donation.getProvider().getUsername()
        )).orElse(null);
    }

    public List<DonationResponse> getProviderDonations(){
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String username = authentication.getName();

        User provider = userRepo.findByUsername(username).get();

        if (provider == null) {
            throw new RuntimeException("User not found");
        }

        if (provider.getRole() != Roles.PROVIDER) {
            throw new RuntimeException(
                    "Only providers can access their donations"
            );
        }

        List<Donation> donations =
                donationRepo.findAllByProvider(provider);

        return donations.stream()
                .map(donation -> new DonationResponse(
                        donation.getDonationId(),
                        donation.getFoodName(),
                        donation.getDescription(),
                        donation.getQuantity(),
                        donation.getUnit(),
                        donation.getPickUpLocation(),
                        donation.getExpiryDate(),
                        donation.getStatus(),
                        provider.getUserId(),
                        provider.getUsername()
                ))
                .toList();
    }

    public DonationResponse cancelDonation(UUID donationId){
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String username = authentication.getName();

        User currentUser = userRepo.findByUsername(username).get();

        if (currentUser == null) {
            throw new RuntimeException("User not found");
        }

        Donation donation = donationRepo.findByDonationId(donationId)
                .orElseThrow(() ->
                        new RuntimeException("Donation not found")
                );

        if (!donation.getProvider()
                .getUserId()
                .equals(currentUser.getUserId())) {

            throw new RuntimeException(
                    "You are not authorized to cancel this donation"
            );
        }
        if (donation.getStatus() != Status.AVAILABLE) {

            throw new RuntimeException(
                    "Only available donations can be cancelled"
            );
        }

        donation.setStatus(Status.CANCELLED);

        Donation savedDonation = donationRepo.save(donation);

        return new DonationResponse(
                savedDonation.getDonationId(),
                savedDonation.getFoodName(),
                savedDonation.getDescription(),
                savedDonation.getQuantity(),
                savedDonation.getUnit(),
                savedDonation.getPickUpLocation(),
                savedDonation.getExpiryDate(),
                savedDonation.getStatus(),
                currentUser.getUserId(),
                currentUser.getUsername()
        );
    }
}
