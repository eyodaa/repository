package com.enterprise.dashen_repository.application.tco.repository;

import com.enterprise.dashen_repository.application.tco.entity.TCOCostItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TCOCostItemRepository extends JpaRepository<TCOCostItem, Long> {
    List<TCOCostItem> findByAssessmentIdOrderByCostDefinitionDisplayOrderAscFinancialYearAsc(
            Long assessmentId);

    /**
     * Returns all cost items belonging to a TCO assessment.
     */
    List<TCOCostItem> findByAssessmentId(Long assessmentId);

    /**
     * Delete all cost items belonging to a TCO assessment.
     */
    void deleteByAssessmentId(Long assessmentId);

}