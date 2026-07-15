package com.enterprise.dashen_repository.application.application_service;

import com.enterprise.dashen_repository.application.application_entity.ApplicationAssessment;
import com.enterprise.dashen_repository.application.application_entity.ApplicationAnalysis;
import com.enterprise.dashen_repository.application.application_repository.ApplicationAnalysisRepository;
import com.enterprise.dashen_repository.application.application_repository.ApplicationAssessmentRepository;
import com.enterprise.dashen_repository.application.dto.ApplicationAnalysisResponse;
import com.enterprise.dashen_repository.application.enums.Disposition;
import com.enterprise.dashen_repository.application.enums.Priority;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ApplicationAnalysisService {

    private static final double PASS_THRESHOLD = 3.0;

    private final ApplicationAssessmentRepository assessmentRepository;
    private final ApplicationAnalysisRepository analysisRepository;
    private final LensCalculationService lensCalculationService;

    public ApplicationAnalysisService(
            ApplicationAssessmentRepository assessmentRepository,
            ApplicationAnalysisRepository analysisRepository,
            LensCalculationService lensCalculationService) {

        this.assessmentRepository = assessmentRepository;
        this.analysisRepository = analysisRepository;
        this.lensCalculationService = lensCalculationService;
    }

    public ApplicationAnalysisResponse analyze(Long applicationId) {

        ApplicationAssessment assessment = assessmentRepository
                .findByApplicationId(applicationId)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        double organizationalValue = lensCalculationService.calculateOrganizationalValue(assessment);

        double technicalHealth = lensCalculationService.calculateTechnicalHealth(assessment);

        double endUserPerspective = lensCalculationService.calculateEndUserPerspective(assessment);

        double totalCostOwnership = lensCalculationService.calculateTCO(assessment);

        boolean organizationalPass = organizationalValue >= PASS_THRESHOLD;
        boolean technicalPass = technicalHealth >= PASS_THRESHOLD;
        boolean endUserPass = endUserPerspective >= PASS_THRESHOLD;
        boolean tcoPass = totalCostOwnership >= PASS_THRESHOLD;

        String pattern = (organizationalPass ? "P" : "F") +
                (technicalPass ? "P" : "F") +
                (endUserPass ? "P" : "F") +
                (tcoPass ? "P" : "F");

        // -------------------------------------------------------
        // Find existing analysis or create new
        // -------------------------------------------------------

        ApplicationAnalysis analysis = analysisRepository
                .findByApplicationId(applicationId)
                .orElse(new ApplicationAnalysis());

        analysis.setApplication(assessment.getApplication());

        analysis.setOrganizationalValue(organizationalValue);
        analysis.setTechnicalHealth(technicalHealth);
        analysis.setEndUserPerspective(endUserPerspective);
        analysis.setTotalCostOwnership(totalCostOwnership);

        analysis.setOrganizationalPass(organizationalPass);
        analysis.setTechnicalPass(technicalPass);
        analysis.setEndUserPass(endUserPass);
        analysis.setTcoPass(tcoPass);

        analysis.setPattern(pattern);

        analysis.setLastCalculated(LocalDateTime.now());

        // -------------------------------------------------------
        // Determine Recommendation
        // -------------------------------------------------------

        Recommendation recommendation = getRecommendation(pattern);

        analysis.setDisposition(recommendation.disposition());
        analysis.setPriority(recommendation.priority());

        // -------------------------------------------------------
        // SAVE TO DATABASE
        // -------------------------------------------------------

        analysisRepository.save(analysis);

        // -------------------------------------------------------
        // Build Response
        // -------------------------------------------------------

        ApplicationAnalysisResponse response = new ApplicationAnalysisResponse();

        response.setApplicationId(applicationId);
        response.setApplicationName(
                assessment.getApplication().getName());

        response.setOrganizationalValue(organizationalValue);
        response.setTechnicalHealth(technicalHealth);
        response.setEndUserPerspective(endUserPerspective);
        response.setTotalCostOwnership(totalCostOwnership);

        response.setOrganizationalPass(organizationalPass);
        response.setTechnicalPass(technicalPass);
        response.setEndUserPass(endUserPass);
        response.setTcoPass(tcoPass);

        response.setPattern(pattern);

        response.setDisposition(recommendation.disposition());
        response.setPriority(recommendation.priority());

        return response;
    }

    private Recommendation getRecommendation(String pattern) {

        return switch (pattern) {

            case "PPPP", "PPPF" ->
                new Recommendation(
                        Disposition.REWARD,
                        Priority.MODERATE);

            case "PPFP", "PPFF" ->
                new Recommendation(
                        Disposition.REFRESH,
                        Priority.HIGH);

            case "PFPP", "PFPF" ->
                new Recommendation(
                        Disposition.REMEDIATE,
                        Priority.VERY_HIGH);

            case "PFFP", "PFFF" ->
                new Recommendation(
                        Disposition.REPLACE,
                        Priority.VERY_HIGH);

            case "FPPP" ->
                new Recommendation(
                        Disposition.REFOCUS,
                        Priority.VERY_LOW);

            case "FPPF" ->
                new Recommendation(
                        Disposition.REFOCUS,
                        Priority.MODERATE);

            case "FPFP" ->
                new Recommendation(
                        Disposition.REFOCUS,
                        Priority.HIGH);

            case "FPFF" ->
                new Recommendation(
                        Disposition.REFOCUS,
                        Priority.VERY_HIGH);

            case "FFPP", "FFPF", "FFFP", "FFFF" ->
                new Recommendation(
                        Disposition.RETIRE,
                        Priority.VERY_HIGH);

            default ->
                throw new RuntimeException("Unknown pattern: " + pattern);
        };
    }

    private record Recommendation(
            Disposition disposition,
            Priority priority) {
    }

}