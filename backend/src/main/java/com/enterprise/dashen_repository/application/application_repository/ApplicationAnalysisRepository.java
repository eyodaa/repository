package com.enterprise.dashen_repository.application.application_repository;

import com.enterprise.dashen_repository.application.application_entity.ApplicationAnalysis;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationAnalysisRepository
        extends JpaRepository<ApplicationAnalysis, Long> {

    Optional<ApplicationAnalysis> findByApplicationId(Long applicationId);

    void deleteByApplicationId(Long applicationId);
}
