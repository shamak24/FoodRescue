package com.project.FoodRescue.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class DonationController {

    @PostMapping("/donations")
    public ResponseEntity<String> createDonation(){
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @GetMapping("/donations/available")
    public ResponseEntity<String> availableDonations(){
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @GetMapping("/donations/provider/{id}")
    public ResponseEntity<String> createDonation(@RequestParam int id){
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @PutMapping("/donations/{id}/complete")
    public ResponseEntity<String> updateDonation(@RequestParam int id){
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }
}
