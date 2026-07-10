package com.example.dashboard.model;

import java.util.List;

public record ProfileResponse(
        boolean success,
        String githubUsername,
        String githubName,
        String githubAvatar,
        String githubBio,
        String githubUrl,
        int githubFollowers,
        int githubFollowing,
        int githubPublicRepos,
        String leetcodeUsername,
        String leetcodeName,
        String leetcodeAvatar,
        int leetcodeRanking,
        int leetcodeSolved,
        int leetcodeEasy,
        int leetcodeMedium,
        int leetcodeHard,
        int leetcodeAcceptance,
        String summary,
        List<String> highlights,
        List<RepositorySummary> repositories
) {
    public record RepositorySummary(
            String name,
            String url,
            String language,
            String description,
            String updatedAt
    ) {}
}
