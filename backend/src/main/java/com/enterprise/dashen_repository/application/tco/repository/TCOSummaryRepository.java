package com.enterprise.dashen_repository.application.tco.repository;

import com.enterprise.dashen_repository.application.tco.entity.TCOSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.Optional;

public interface TCOSummaryRepository
        extends JpaRepository<TCOSummary, Long> {

    Optional<TCOSummary> findByAssessmentId(Long assessmentId);

    @Query("""
            SELECT COALESCE(SUM(s.grandTotal), 0)
            FROM TCOSummary s
            """)
    BigDecimal getTotalApplicationCost();
}