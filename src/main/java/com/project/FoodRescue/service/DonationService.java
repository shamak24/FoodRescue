package com.project.FoodRescue.service;

import com.project.FoodRescue.dto.Donation.DonationRequest;
import com.project.FoodRescue.dto.Donation.DonationResponse;
import com.project.FoodRescue.model.Donation;
import com.project.FoodRescue.model.Status;
import com.project.FoodRescue.model.User;
import com.project.FoodRescue.repository.DonationRepository;
import com.project.FoodRescue.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepo;
    @Autowired
    private UserRepository userRepo;

    public DonationResponse createDonation(DonationRequest donationRequest){
        User provider = userRepo.findByUserId(donationRequest.getProviderId()).orElse(null);
        if(provider == null){
            return null;
        }
        Donation donation = new Donation();

        donation.setFoodName(donationRequest.getFoodName());
        donation.setDescription(donationRequest.getDescription());
        donation.setQuantity(donationRequest.getQuantity());
        donation.setUnit(donationRequest.getUnit());
        donation.setPickUpLocation(donationRequest.getPickUpLocation());
        donation.setExpiryDate(LocalDateTime.parse(donationRequest.getExpiryDate()));
        donation.setStatus(Status.AVAILABLE);
        donation.setProvider(provider);

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
                provider.getUserId()
        );
    }

    public List<Donation> getAvailableDonations(){
        return donationRepo.findAllByStatus(Status.AVAILABLE.toString());
    }
}
