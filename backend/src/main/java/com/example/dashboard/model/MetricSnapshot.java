package com.example.dashboard.model;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MetricSnapshot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Instant capturedAt;
    private int githubCommits;
    private int githubPrs;
    private int githubStars;
    private int leetcodeEasy;
    private int leetcodeMedium;
    private int leetcodeHard;
    private int leetcodeRanking;

    public MetricSnapshot() {}

    public MetricSnapshot(Instant capturedAt, int githubCommits, int githubPrs, int githubStars,
                          int leetcodeEasy, int leetcodeMedium, int leetcodeHard, int leetcodeRanking) {
        this.capturedAt = capturedAt;
        this.githubCommits = githubCommits;
        this.githubPrs = githubPrs;
        this.githubStars = githubStars;
        this.leetcodeEasy = leetcodeEasy;
        this.leetcodeMedium = leetcodeMedium;
        this.leetcodeHard = leetcodeHard;
        this.leetcodeRanking = leetcodeRanking;
    }

    public Long getId() { return id; }
    public Instant getCapturedAt() { return capturedAt; }
    public int getGithubCommits() { return githubCommits; }
    public int getGithubPrs() { return githubPrs; }
    public int getGithubStars() { return githubStars; }
    public int getLeetcodeEasy() { return leetcodeEasy; }
    public int getLeetcodeMedium() { return leetcodeMedium; }
    public int getLeetcodeHard() { return leetcodeHard; }
    public int getLeetcodeRanking() { return leetcodeRanking; }
}
