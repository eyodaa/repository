package com.enterprise.dashen_repository.application.tco.service;

import com.enterprise.dashen_repository.application.application_entity.Application;
import com.enterprise.dashen_repository.application.application_repository.ApplicationRepository;
import com.enterprise.dashen_repository.application.tco.dto.CostItemRequest;
import com.enterprise.dashen_repository.application.tco.dto.CostItemResponse;
import com.enterprise.dashen_repository.application.tco.dto.CreateTCOAssessmentRequest;
import com.enterprise.dashen_repository.application.tco.dto.TCOAssessmentResponse;
import com.enterprise.dashen_repository.application.tco.dto.YearAmountRequest;
import com.enterprise.dashen_repository.application.tco.dto.YearAmountResponse;
import com.enterprise.dashen_repository.application.tco.entity.ApplicationTCOAssessment;
import com.enterprise.dashen_repository.application.tco.entity.TCOCostDefinition;
import com.enterprise.dashen_repository.application.tco.entity.TCOCostItem;
import com.enterprise.dashen_repository.application.tco.entity.TCOSummary;
import com.enterprise.dashen_repository.application.tco.repository.ApplicationTCOAssessmentRepository;
import com.enterprise.dashen_repository.application.tco.repository.TCOCostDefinitionRepository;
import com.enterprise.dashen_repository.application.tco.repository.TCOCostItemRepository;
import com.enterprise.dashen_repository.application.tco.repository.TCOSummaryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ApplicationTCOAssessmentService {

        private final ApplicationTCOAssessmentRepository assessmentRepository;
        private final TCOCostItemRepository costItemRepository;
        private final TCOCostDefinitionRepository costDefinitionRepository;
        private final TCOSummaryRepository summaryRepository;
        private final ApplicationRepository applicationRepository;
        private final TCOEngine tcoEngine;

        public ApplicationTCOAssessmentService(
                        ApplicationTCOAssessmentRepository assessmentRepository,
                        TCOCostItemRepository costItemRepository,
                        TCOCostDefinitionRepository costDefinitionRepository,
                        TCOSummaryRepository summaryRepository,
                        ApplicationRepository applicationRepository,
                        TCOEngine tcoEngine) {

                this.assessmentRepository = assessmentRepository;
                this.costItemRepository = costItemRepository;
                this.costDefinitionRepository = costDefinitionRepository;
                this.summaryRepository = summaryRepository;
                this.applicationRepository = applicationRepository;
                this.tcoEngine = tcoEngine;
        }

        @Transactional
        public TCOAssessmentResponse createAssessment(CreateTCOAssessmentRequest request) {

                Application application = applicationRepository
                                .findById(request.getApplicationId())
                                .orElseThrow(() -> new RuntimeException("Application not found"));


                ApplicationTCOAssessment assessment = new ApplicationTCOAssessment();

                assessment.setApplication(application);
                assessment.setAssessmentYear(request.getAssessmentYear());
                assessment.setCurrency(request.getCurrency());
                assessment.setAssessedBy(request.getAssessedBy());
                assessment.setNotes(request.getNotes());

                assessment = assessmentRepository.save(assessment);

                // Save all years for every cost definition

                for (CostItemRequest costItem : request.getCostItems()) {

                        TCOCostDefinition definition = costDefinitionRepository
                                        .findById(costItem.getCostDefinitionId())
                                        .orElseThrow(() -> new RuntimeException("Cost definition not found"));

                        for (YearAmountRequest year : costItem.getYearlyAmounts()) {

                                TCOCostItem item = new TCOCostItem();

                                item.setAssessment(assessment);
                                item.setCostDefinition(definition);
                                item.setFinancialYear(year.getFinancialYear());
                                item.setAmount(year.getAmount());

                                costItemRepository.save(item);
                        }
                }

                // Calculate totals

                tcoEngine.calculateAssessment(assessment.getId());

                // Reload after calculation

                assessment = assessmentRepository.findById(assessment.getId())
                                .orElseThrow();

                return convertToResponse(assessment);
        }

        public TCOAssessmentResponse getAssessment(Long id) {

                ApplicationTCOAssessment assessment = assessmentRepository
                                .findById(id)
                                .orElseThrow(() -> new RuntimeException("Assessment not found"));

                return convertToResponse(assessment);
        }

        public List<TCOAssessmentResponse> getApplicationAssessments(Long applicationId) {

                return assessmentRepository
                                .findByApplicationIdOrderByAssessmentYearDesc(applicationId)
                                .stream()
                                .map(this::convertToResponse)
                                .collect(Collectors.toList());
        }

        @Transactional
        public void deleteAssessment(Long id) {

                ApplicationTCOAssessment assessment = assessmentRepository
                                .findById(id)
                                .orElseThrow(() -> new RuntimeException("Assessment not found"));

                costItemRepository.deleteByAssessmentId(id);

                assessmentRepository.delete(assessment);
        }

        private TCOAssessmentResponse convertToResponse(
                        ApplicationTCOAssessment assessment) {

                TCOAssessmentResponse response = new TCOAssessmentResponse();

                response.setId(assessment.getId());
                response.setApplicationId(assessment.getApplication().getId());
                response.setAssessmentYear(assessment.getAssessmentYear());
                response.setAssessmentDate(
                                assessment.getAssessmentDate().toString());
                response.setCurrency(assessment.getCurrency());
                response.setAssessedBy(assessment.getAssessedBy());
                response.setStatus(assessment.getStatus().name());
                response.setNotes(assessment.getNotes());

                // --------------------------------------------------
                // Load all cost items
                // --------------------------------------------------

                List<TCOCostItem> items = costItemRepository
                                .findByAssessmentIdOrderByCostDefinitionDisplayOrderAscFinancialYearAsc(
                                                assessment.getId());

                Map<Long, CostItemResponse> map = new LinkedHashMap<>();

                for (TCOCostItem item : items) {

                        Long definitionId = item.getCostDefinition().getId();

                        CostItemResponse costItem = map.computeIfAbsent(definitionId, id -> {

                                CostItemResponse dto = new CostItemResponse();

                                dto.setCostDefinitionId(id);
                                dto.setCode(item.getCostDefinition().getCode());
                                dto.setName(item.getCostDefinition().getName());

                                if (item.getCostDefinition().getCategory() != null) {
                                        dto.setCategory(
                                                        item.getCostDefinition()
                                                                        .getCategory()
                                                                        .getCode());
                                }

                                return dto;

                        });

                        YearAmountResponse year = new YearAmountResponse();

                        year.setFinancialYear(item.getFinancialYear());
                        year.setAmount(item.getAmount());

                        costItem.getYearlyAmounts().add(year);
                }

                response.setCostItems(
                                map.values()
                                                .stream()
                                                .toList());

                // --------------------------------------------------
                // Summary
                // --------------------------------------------------

                summaryRepository.findByAssessmentId(
                                assessment.getId())
                                .ifPresent(summary -> {

                                        if (summary.getGrandTotal() != null) {
                                                response.setTotalCost(
                                                                summary.getGrandTotal().doubleValue());
                                        }

                                        response.setOverallScore(
                                                        summary.getOverallScore());

                                });

                return response;
        }

        @Transactional
        public TCOAssessmentResponse updateAssessment(
                        Long id,
                        CreateTCOAssessmentRequest request) {

                ApplicationTCOAssessment assessment = assessmentRepository
                                .findById(id)
                                .orElseThrow(() -> new RuntimeException("Assessment not found"));

                assessment.setCurrency(request.getCurrency());
                assessment.setAssessedBy(request.getAssessedBy());
                assessment.setNotes(request.getNotes());

                assessmentRepository.save(assessment);

                // Remove existing cost items

                costItemRepository.deleteByAssessmentId(id);

                // Save new cost items

                for (CostItemRequest costItem : request.getCostItems()) {

                        TCOCostDefinition definition = costDefinitionRepository
                                        .findById(costItem.getCostDefinitionId())
                                        .orElseThrow(() -> new RuntimeException("Cost definition not found"));

                        for (YearAmountRequest yearAmount : costItem.getYearlyAmounts()) {

                                TCOCostItem item = new TCOCostItem();

                                item.setAssessment(assessment);

                                item.setCostDefinition(definition);

                                item.setFinancialYear(
                                                yearAmount.getFinancialYear());

                                item.setAmount(
                                                yearAmount.getAmount());

                                costItemRepository.save(item);
                        }
                }

                // Recalculate

                tcoEngine.calculateAssessment(id);

                assessment = assessmentRepository
                                .findById(id)
                                .orElseThrow();

                return convertToResponse(assessment);
        }

        public TCOAssessmentResponse getAssessment(
                        Long applicationId,
                        Integer assessmentYear) {

                ApplicationTCOAssessment assessment = assessmentRepository
                                .findByApplicationIdAndAssessmentYear(
                                                applicationId,
                                                assessmentYear)
                                .orElseThrow(() -> new RuntimeException(
                                                "Assessment not found"));

                return convertToResponse(assessment);
        }

}