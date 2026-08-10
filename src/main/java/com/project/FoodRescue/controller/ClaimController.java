package com.project.FoodRescue.controller;

import com.project.FoodRescue.model.Claim;
import com.project.FoodRescue.service.ClaimService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/claims")
@RequiredArgsConstructor
public class ClaimController {

    private final ClaimService claimService;

    @PostMapping("/{donationId}")
    public ResponseEntity<?> claimDonation(@PathVariable UUID donationId) {
        try {
            Claim claim =
                    claimService.claimDonation(donationId);

            return new ResponseEntity<>(
                    claim,
                    HttpStatus.CREATED
            );
        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyClaims() {

        try {

            List<Claim> claims =
                    claimService.getMyClaims();

            return ResponseEntity.ok(claims);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping("/{claimId}")
    public ResponseEntity<?> getClaimById(
            @PathVariable UUID claimId) {

        try {

            Claim claim =
                    claimService.getClaimById(claimId);

            return ResponseEntity.ok(claim);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}