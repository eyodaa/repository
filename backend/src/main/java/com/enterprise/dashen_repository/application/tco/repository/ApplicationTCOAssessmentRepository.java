package com.enterprise.dashen_repository.application.tco.repository;

import com.enterprise.dashen_repository.application.tco.entity.ApplicationTCOAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationTCOAssessmentRepository
                extends JpaRepository<ApplicationTCOAssessment, Long> {

        Optional<ApplicationTCOAssessment> findByApplicationIdAndAssessmentYear(
                        Long applicationId,
                        Integer assessmentYear);

        List<ApplicationTCOAssessment> findByApplicationIdOrderByAssessmentYearDesc(
                        Long applicationId);

        List<ApplicationTCOAssessment> findByApplicationId(Long applicationId);

        boolean existsByApplicationIdAndAssessmentYear(
                        Long applicationId,
                        Integer assessmentYear);
}