package com.example.dashboard.repository;

import com.example.dashboard.model.MetricSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetricSnapshotRepository extends JpaRepository<MetricSnapshot, Long> {
}
