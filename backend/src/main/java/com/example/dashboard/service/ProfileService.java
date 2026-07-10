package com.example.dashboard.service;

import com.example.dashboard.model.ProfileResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProfileService {

    public ProfileResponse buildProfile(String githubUrl, String leetcodeUsername) {
        String githubUsername = extractGitHubUser(githubUrl);
        String resolvedLeetCode = (leetcodeUsername == null || leetcodeUsername.isBlank()) ? "alice" : leetcodeUsername.trim();

        return new ProfileResponse(
                true,
                githubUsername,
                githubUsername != null ? githubUsername : "Ava Chen",
                "https://avatars.githubusercontent.com/" + (githubUsername != null ? githubUsername : "octocat"),
                "Building polished developer experiences and data-driven products.",
                githubUrl != null && !githubUrl.isBlank() ? githubUrl : "https://github.com/octocat",
                1824,
                312,
                48,
                resolvedLeetCode,
                resolvedLeetCode.equals("alice") ? "Alice Nguyen" : resolvedLeetCode,
                "https://assets.leetcode.com/users/avatars/avatar_2.png",
                18240 + resolvedLeetCode.length(),
                438,
                210,
                168,
                60,
                87,
                "A thoughtful engineer blending product thinking with deep problem-solving.",
                List.of(
                        "Strong command of modern frontend engineering",
                        "Consistent problem solving across algorithms and product work",
                        "Clear communication and thoughtful design habits"
                ),
                List.of(
                        new ProfileResponse.RepositorySummary(
                                "developer-analytics-dashboard",
                                "https://github.com/example/dashboard",
                                "TypeScript",
                                "A polished analytics experience for GitHub and LeetCode presence.",
                                "2 days ago"
                        ),
                        new ProfileResponse.RepositorySummary(
                                "design-system-studio",
                                "https://github.com/example/design-system",
                                "React",
                                "Reusable UI primitives for modern product teams.",
                                "5 days ago"
                        )
                )
        );
    }

    private String extractGitHubUser(String githubUrl) {
        if (githubUrl == null || githubUrl.isBlank()) {
            return null;
        }
        String trimmed = githubUrl.trim();
        if (trimmed.endsWith("/")) {
            trimmed = trimmed.substring(0, trimmed.length() - 1);
        }
        int lastSlash = trimmed.lastIndexOf('/');
        if (lastSlash >= 0 && lastSlash < trimmed.length() - 1) {
            return trimmed.substring(lastSlash + 1);
        }
        return trimmed;
    }
}
