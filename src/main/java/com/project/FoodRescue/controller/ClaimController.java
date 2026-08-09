package com.project.FoodRescue.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ClaimController {

    @PostMapping("/donations/{donateId}/claim")
    public ResponseEntity<String> claimDonation(@PathVariable int donateId){
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

//    @GetMapping("/claims/volunteer/{id}")
//    public ResponseEntity<String> claimDonation(@PathVariable int id){
//        return new ResponseEntity<>("Success", HttpStatus.OK);
//    }

    @PutMapping("/claims/{id}/pickup")
    public ResponseEntity<String> pickClaim(@PathVariable int id){
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @PutMapping("/claims/{id}/cancel")
    public ResponseEntity<String> cancelClaim(@PathVariable int id){
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }
}
