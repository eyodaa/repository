package com.enterprise.dashen_repository.application.application_repository;

import com.enterprise.dashen_repository.application.application_entity.ApplicationAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ApplicationAssessmentRepository extends JpaRepository<ApplicationAssessment, Long> {

    Optional<ApplicationAssessment> findByApplicationId(Long applicationId);

}
