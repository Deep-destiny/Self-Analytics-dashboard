package com.example.dashboard.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dashboard.model.ProfileResponse;
import com.example.dashboard.service.ProfileService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProfileController {
    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/profile")
    public ProfileResponse getProfile(
            @RequestParam(required = false) String githubUrl,
            @RequestParam(required = false) String leetcodeUsername) {
        return profileService.buildProfile(githubUrl, leetcodeUsername);
    }
}
