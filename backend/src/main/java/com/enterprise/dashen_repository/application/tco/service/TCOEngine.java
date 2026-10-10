package com.enterprise.dashen_repository.application.tco.service;

import com.enterprise.dashen_repository.application.application_entity.ApplicationAssessment;
import com.enterprise.dashen_repository.application.application_repository.ApplicationAssessmentRepository;
import com.enterprise.dashen_repository.application.tco.entity.ApplicationTCOAssessment;
import com.enterprise.dashen_repository.application.tco.entity.TCOCategory;
import com.enterprise.dashen_repository.application.tco.entity.TCOCostItem;
import com.enterprise.dashen_repository.application.tco.entity.TCOSummary;
import com.enterprise.dashen_repository.application.tco.repository.ApplicationTCOAssessmentRepository;
import com.enterprise.dashen_repository.application.tco.repository.TCOCategoryRepository;
import com.enterprise.dashen_repository.application.tco.repository.TCOCostItemRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TCOEngine {

        private final ApplicationTCOAssessmentRepository assessmentRepository;

        private final TCOCostItemRepository costItemRepository;

        private final ApplicationAssessmentRepository applicationAssessmentRepository;

        private final TCOCategoryRepository categoryRepository;

        private final CategoryCalculationService categoryService;

        private final ScoreCalculationService scoreService;

        private final SummaryCalculationService summaryService;

        private final AssessmentSyncService syncService;

        public TCOEngine(
                        ApplicationTCOAssessmentRepository assessmentRepository,
                        TCOCostItemRepository costItemRepository,
                        ApplicationAssessmentRepository applicationAssessmentRepository,
                        TCOCategoryRepository categoryRepository,
                        CategoryCalculationService categoryService,
                        ScoreCalculationService scoreService,
                        SummaryCalculationService summaryService,
                        AssessmentSyncService syncService) {

                this.assessmentRepository = assessmentRepository;
                this.costItemRepository = costItemRepository;
                this.applicationAssessmentRepository = applicationAssessmentRepository;
                this.categoryRepository = categoryRepository;
                this.categoryService = categoryService;
                this.scoreService = scoreService;
                this.summaryService = summaryService;
                this.syncService = syncService;
        }

        public void calculateAssessment(Long assessmentId) {

                System.out.println("\n================ TCO ENGINE START ================\n");

                // Load Assessment
                ApplicationTCOAssessment assessment = assessmentRepository
                                .findById(assessmentId)
                                .orElseThrow(() -> new RuntimeException("TCO Assessment not found"));

                // Load Cost Items
                List<TCOCostItem> items = costItemRepository.findByAssessmentId(assessmentId);

                System.out.println("Number of Cost Items = " + items.size());

                for (TCOCostItem item : items) {

                        System.out.println(
                                        "Item -> "
                                                        + item.getCostDefinition().getCode()
                                                        + " | Category="
                                                        + item.getCostDefinition().getCategory().getCode()
                                                        + " | Amount="
                                                        + item.getAmount());
                }

                // Load Application Assessment
                ApplicationAssessment applicationAssessment = applicationAssessmentRepository
                                .findByApplicationId(
                                                assessment.getApplication().getId())
                                .orElseThrow(() -> new RuntimeException("Application Assessment not found"));

                // Calculate Totals
                Map<String, BigDecimal> categoryTotals = categoryService.calculateCategoryTotals(items);

                System.out.println("\n========= CATEGORY TOTALS FROM SERVICE =========");

                for (Map.Entry<String, BigDecimal> entry : categoryTotals.entrySet()) {

                        System.out.println(
                                        entry.getKey()
                                                        + " -> "
                                                        + entry.getValue());
                }

                Map<String, BigDecimal> totals = new HashMap<>();
                Map<String, Integer> scores = new HashMap<>();

                List<TCOCategory> categories = categoryRepository.findAll();

                System.out.println("\n========= ALL DATABASE CATEGORIES =========");

                for (TCOCategory category : categories) {

                        BigDecimal total = categoryTotals.getOrDefault(category.getCode(), BigDecimal.ZERO);

                        Integer score = scoreService.calculateScore(category, total);

                        totals.put(category.getCode(), total);
                        scores.put(category.getCode(), score);

                        System.out.println(
                                        category.getCode()
                                                        + " | Total="
                                                        + total
                                                        + " | Score="
                                                        + score);
                }

                System.out.println("\n========= TOTALS MAP =========");

                totals.forEach((k, v) -> System.out.println(k + " = " + v));

                System.out.println("\n========= SCORES MAP =========");

                scores.forEach((k, v) -> System.out.println(k + " = " + v));

                // Build Summary
                TCOSummary summary = summaryService.buildSummary(
                                assessment,
                                totals,
                                scores);

                System.out.println("\n========= SUMMARY =========");

                System.out.println("External Score       = " + summary.getExternalSoftwareScore());
                System.out.println("Upgrade Score        = " + summary.getSoftwareUpgradeScore());
                System.out.println("Labour Score         = " + summary.getLabourScore());
                System.out.println("Infrastructure Score = " + summary.getInfrastructureScore());
                System.out.println("Support Score        = " + summary.getSupportScore());
                System.out.println("Overall Score        = " + summary.getOverallScore());
                System.out.println("Grand Total          = " + summary.getGrandTotal());

                syncService.sync(
                                applicationAssessment,
                                summary);

                System.out.println("\n================ TCO ENGINE END ================\n");
        }
}