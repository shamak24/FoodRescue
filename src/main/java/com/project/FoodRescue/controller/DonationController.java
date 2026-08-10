package com.project.FoodRescue.controller;

import com.project.FoodRescue.dto.Donation.DonationRequest;
import com.project.FoodRescue.dto.Donation.DonationResponse;
import com.project.FoodRescue.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin
public class DonationController {

    @Autowired
    private DonationService donationService;
    
    @PostMapping("/create")
    public ResponseEntity<?> createDonation(@RequestBody DonationRequest request) {
        try {
            DonationResponse donation = donationService.createDonation(request);
            return new ResponseEntity<DonationResponse>(donation, HttpStatus.CREATED);

        } catch (RuntimeException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/available")
    public ResponseEntity<?> getAvailableDonations() {
        try {
            List<DonationResponse> donations = donationService.getAvailableDonations();
            return new ResponseEntity<List<DonationResponse>>(donations, HttpStatus.OK);

        } catch (RuntimeException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{donationId}")
    public ResponseEntity<?> getDonationById(@PathVariable UUID donationId) {
        try {
            DonationResponse donation = donationService.getDonationById(donationId);
            return new ResponseEntity<DonationResponse>(donation, HttpStatus.OK);

        } catch (RuntimeException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/my")
    public ResponseEntity<?> getProviderDonations() {
        try {
            List<DonationResponse> donations = donationService.getProviderDonations();
            return new ResponseEntity<List<DonationResponse>>(donations, HttpStatus.OK);

        } catch (RuntimeException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/{donationId}/cancel")
    public ResponseEntity<?> cancelDonation(@PathVariable UUID donationId) {
        try {
            DonationResponse donation = donationService.cancelDonation(donationId);
            return new ResponseEntity<DonationResponse>(donation, HttpStatus.OK);

        } catch (RuntimeException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
