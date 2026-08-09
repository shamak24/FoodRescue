package com.project.FoodRescue.controller;

import com.project.FoodRescue.dto.Donation.DonationRequest;
import com.project.FoodRescue.dto.Donation.DonationResponse;
import com.project.FoodRescue.model.Donation;
import com.project.FoodRescue.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin
public class DonationController {

    @Autowired
    private DonationService donationService;

    @PostMapping("/create")
    public ResponseEntity<DonationResponse> createDonation(@RequestBody DonationRequest donationRequest){
        DonationResponse response = donationService.createDonation(donationRequest);
        if(response == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/available")
    public ResponseEntity<List<Donation>> availableDonations(){
        return new ResponseEntity<List<Donation>>(donationService.getAvailableDonations(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getDonation(@PathVariable int id){
        System.out.println("ID printed"+ id);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @GetMapping("/provider/{id}")
    public ResponseEntity<String> getProviderDonation(@PathVariable int id){
        System.out.println("ID printed"+ id);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<String> cancelDonation(@PathVariable int id){
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }
}
