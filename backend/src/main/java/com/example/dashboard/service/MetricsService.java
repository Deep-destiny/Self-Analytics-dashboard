package com.example.dashboard.service;

import com.example.dashboard.model.MetricSnapshot;
import com.example.dashboard.repository.MetricSnapshotRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class MetricsService {
    private final MetricSnapshotRepository repository;
    private final SimpMessagingTemplate messagingTemplate;

    public MetricsService(MetricSnapshotRepository repository, SimpMessagingTemplate messagingTemplate) {
        this.repository = repository;
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedRate = 60000)
    public void captureSnapshot() {
        MetricSnapshot snapshot = new MetricSnapshot(
                Instant.now(),
                42 + (int) (Math.random() * 10),
                7 + (int) (Math.random() * 5),
                120 + (int) (Math.random() * 20),
                120 + (int) (Math.random() * 10),
                45 + (int) (Math.random() * 8),
                8 + (int) (Math.random() * 4),
                1000 + (int) (Math.random() * 100)
        );
        repository.save(snapshot);
        messagingTemplate.convertAndSend("/topic/updates", snapshot);
    }

    public List<MetricSnapshot> getHistory() {
        return repository.findAll();
    }
}
