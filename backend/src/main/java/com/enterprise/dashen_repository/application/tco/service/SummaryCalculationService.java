package com.enterprise.dashen_repository.application.tco.service;

import com.enterprise.dashen_repository.application.tco.entity.ApplicationTCOAssessment;
import com.enterprise.dashen_repository.application.tco.entity.TCOSummary;
import com.enterprise.dashen_repository.application.tco.repository.TCOSummaryRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class SummaryCalculationService {

        private final TCOSummaryRepository repository;

        public SummaryCalculationService(TCOSummaryRepository repository) {
                this.repository = repository;
        }

        public TCOSummary buildSummary(
                        ApplicationTCOAssessment assessment,
                        Map<String, BigDecimal> totals,
                        Map<String, Integer> scores) {

                TCOSummary summary = repository
                                .findByAssessmentId(assessment.getId())
                                .orElse(new TCOSummary());

                summary.setAssessment(assessment);

                // Totals
                summary.setExternalSoftwareTotal(
                                totals.getOrDefault("EXTERNAL", BigDecimal.ZERO));

                summary.setSoftwareUpgradeTotal(
                                totals.getOrDefault("UPGRADE", BigDecimal.ZERO));

                summary.setLabourTotal(
                                totals.getOrDefault("LABOUR", BigDecimal.ZERO));

                summary.setInfrastructureTotal(
                                totals.getOrDefault("INFRASTRUCTURE", BigDecimal.ZERO));

                summary.setSupportTotal(
                                totals.getOrDefault("SUPPORT", BigDecimal.ZERO));

                // Grand Total
                BigDecimal grandTotal = summary.getExternalSoftwareTotal()
                                .add(summary.getSoftwareUpgradeTotal())
                                .add(summary.getLabourTotal())
                                .add(summary.getInfrastructureTotal())
                                .add(summary.getSupportTotal());

                summary.setGrandTotal(grandTotal);

                // Scores
                summary.setExternalSoftwareScore(scores.getOrDefault("EXTERNAL", 0));
                summary.setSoftwareUpgradeScore(scores.getOrDefault("UPGRADE", 0));
                summary.setLabourScore(scores.getOrDefault("LABOUR", 0));
                summary.setInfrastructureScore(scores.getOrDefault("INFRASTRUCTURE", 0));
                summary.setSupportScore(scores.getOrDefault("SUPPORT", 0));

                // Calculate overall using ONLY categories that actually contain costs
                int totalScore = 0;
                int categoryCount = 0;

                if (summary.getExternalSoftwareTotal().compareTo(BigDecimal.ZERO) > 0) {
                        totalScore += summary.getExternalSoftwareScore();
                        categoryCount++;
                }

                if (summary.getSoftwareUpgradeTotal().compareTo(BigDecimal.ZERO) > 0) {
                        totalScore += summary.getSoftwareUpgradeScore();
                        categoryCount++;
                }

                if (summary.getLabourTotal().compareTo(BigDecimal.ZERO) > 0) {
                        totalScore += summary.getLabourScore();
                        categoryCount++;
                }

                if (summary.getInfrastructureTotal().compareTo(BigDecimal.ZERO) > 0) {
                        totalScore += summary.getInfrastructureScore();
                        categoryCount++;
                }

                if (summary.getSupportTotal().compareTo(BigDecimal.ZERO) > 0) {
                        totalScore += summary.getSupportScore();
                        categoryCount++;
                }

                double overall = categoryCount == 0
                                ? 0
                                : (double) totalScore / categoryCount;

                summary.setOverallScore(overall);

                return repository.save(summary);
        }
}