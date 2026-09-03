package com.enterprise.dashen_repository.application.tco.entity;

import com.enterprise.dashen_repository.common.entity.BaseEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "tco_cost_item")
public class TCOCostItem extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assessment_id", nullable = false)
    private ApplicationTCOAssessment assessment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cost_definition_id", nullable = false)
    private TCOCostDefinition costDefinition;

    @Column(name = "financial_year", nullable = false)
    private Integer financialYear;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amount = BigDecimal.ZERO;

    public TCOCostItem() {
    }

    public ApplicationTCOAssessment getAssessment() {
        return assessment;
    }

    public void setAssessment(ApplicationTCOAssessment assessment) {
        this.assessment = assessment;
    }

    public TCOCostDefinition getCostDefinition() {
        return costDefinition;
    }

    public void setCostDefinition(TCOCostDefinition costDefinition) {
        this.costDefinition = costDefinition;
    }

    public Integer getFinancialYear() {
        return financialYear;
    }

    public void setFinancialYear(Integer financialYear) {
        this.financialYear = financialYear;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}