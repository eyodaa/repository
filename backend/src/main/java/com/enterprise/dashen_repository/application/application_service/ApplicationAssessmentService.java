package com.enterprise.dashen_repository.application.application_service;

import com.enterprise.dashen_repository.application.dto.ApplicationAssessmentRequest;
import com.enterprise.dashen_repository.application.dto.ApplicationAssessmentResponse;
import com.enterprise.dashen_repository.application.application_entity.ApplicationAssessment;
import com.enterprise.dashen_repository.application.application_repository.ApplicationAssessmentRepository;
import com.enterprise.dashen_repository.application.application_entity.Application;
import com.enterprise.dashen_repository.application.application_repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationAssessmentService {

    private final ApplicationAssessmentRepository assessmentRepository;
    private final ApplicationRepository applicationRepository;

    public ApplicationAssessmentService(
            ApplicationAssessmentRepository assessmentRepository,
            ApplicationRepository applicationRepository) {

        this.assessmentRepository = assessmentRepository;
        this.applicationRepository = applicationRepository;
    }

    public ApplicationAssessmentResponse create(ApplicationAssessmentRequest request) {

        Application application = applicationRepository.findById(request.getApplicationId())
                .orElseThrow(() -> new RuntimeException("Application not found"));

        ApplicationAssessment assessment = assessmentRepository
                .findByApplicationId(application.getId())
                .orElse(new ApplicationAssessment());

        assessment.setApplication(application);

        assessment.setIncreaseValue(request.getIncreaseValue());
        assessment.setReachConsumers(request.getReachConsumers());
        assessment.setReduceCosts(request.getReduceCosts());
        assessment.setEnhanceServices(request.getEnhanceServices());
        assessment.setGovernanceCompliance(request.getGovernanceCompliance());

        assessment.setSecurityCompliance(request.getSecurityCompliance());
        assessment.setBusinessContinuity(request.getBusinessContinuity());
        assessment.setMaintainability(request.getMaintainability());
        assessment.setAdaptability(request.getAdaptability());
        assessment.setInteroperability(request.getInteroperability());

        assessment.setDataQuality(request.getDataQuality());
        assessment.setEffectiveness(request.getEffectiveness());
        assessment.setUsability(request.getUsability());
        assessment.setSatisfaction(request.getSatisfaction());

        assessment.setTotalCostOwnership(request.getTotalCostOwnership());

        ApplicationAssessment saved = assessmentRepository.save(assessment);

        return map(saved);
    }

    public List<ApplicationAssessmentResponse> findAll() {

        return assessmentRepository.findAll()
                .stream()
                .map(this::map)
                .collect(Collectors.toList());
    }

    public ApplicationAssessmentResponse findById(Long id) {

        ApplicationAssessment assessment = assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        return map(assessment);
    }

    public void delete(Long id) {
        assessmentRepository.deleteById(id);
    }

    private ApplicationAssessmentResponse map(ApplicationAssessment assessment) {

        ApplicationAssessmentResponse response = new ApplicationAssessmentResponse();

        response.setId(assessment.getId());

        response.setApplicationId(assessment.getApplication().getId());
        response.setApplicationName(assessment.getApplication().getName());

        response.setIncreaseValue(assessment.getIncreaseValue());
        response.setReachConsumers(assessment.getReachConsumers());
        response.setReduceCosts(assessment.getReduceCosts());
        response.setEnhanceServices(assessment.getEnhanceServices());
        response.setGovernanceCompliance(assessment.getGovernanceCompliance());

        response.setSecurityCompliance(assessment.getSecurityCompliance());
        response.setBusinessContinuity(assessment.getBusinessContinuity());
        response.setMaintainability(assessment.getMaintainability());
        response.setAdaptability(assessment.getAdaptability());
        response.setInteroperability(assessment.getInteroperability());

        response.setDataQuality(assessment.getDataQuality());
        response.setEffectiveness(assessment.getEffectiveness());
        response.setUsability(assessment.getUsability());
        response.setSatisfaction(assessment.getSatisfaction());

        response.setTotalCostOwnership(assessment.getTotalCostOwnership());

        return response;
    }

    public ApplicationAssessmentResponse findByApplicationId(Long applicationId) {

        ApplicationAssessment assessment = assessmentRepository
                .findByApplicationId(applicationId)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        return map(assessment);
    }
}