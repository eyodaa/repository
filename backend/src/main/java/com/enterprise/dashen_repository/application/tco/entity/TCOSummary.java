package com.enterprise.dashen_repository.application.tco.entity;

import com.enterprise.dashen_repository.common.entity.BaseEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "tco_summary")
public class TCOSummary extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assessment_id", nullable = false, unique = true)
    private ApplicationTCOAssessment assessment;

    // Category Totals

    @Column(precision = 19, scale = 2)
    private BigDecimal externalSoftwareTotal = BigDecimal.ZERO;

    @Column(precision = 19, scale = 2)
    private BigDecimal softwareUpgradeTotal = BigDecimal.ZERO;

    @Column(precision = 19, scale = 2)
    private BigDecimal labourTotal = BigDecimal.ZERO;

    @Column(precision = 19, scale = 2)
    private BigDecimal infrastructureTotal = BigDecimal.ZERO;

    @Column(precision = 19, scale = 2)
    private BigDecimal supportTotal = BigDecimal.ZERO;

    @Column(precision = 19, scale = 2)
    private BigDecimal grandTotal = BigDecimal.ZERO;

    // Scores

    private Integer externalSoftwareScore;

    private Integer softwareUpgradeScore;

    private Integer labourScore;

    private Integer infrastructureScore;

    private Integer supportScore;

    private Double overallScore;

    public TCOSummary() {
    }

    public ApplicationTCOAssessment getAssessment() {
        return assessment;
    }

    public void setAssessment(ApplicationTCOAssessment assessment) {
        this.assessment = assessment;
    }

    public BigDecimal getExternalSoftwareTotal() {
        return externalSoftwareTotal;
    }

    public void setExternalSoftwareTotal(BigDecimal externalSoftwareTotal) {
        this.externalSoftwareTotal = externalSoftwareTotal;
    }

    public BigDecimal getSoftwareUpgradeTotal() {
        return softwareUpgradeTotal;
    }

    public void setSoftwareUpgradeTotal(BigDecimal softwareUpgradeTotal) {
        this.softwareUpgradeTotal = softwareUpgradeTotal;
    }

    public BigDecimal getLabourTotal() {
        return labourTotal;
    }

    public void setLabourTotal(BigDecimal labourTotal) {
        this.labourTotal = labourTotal;
    }

    public BigDecimal getInfrastructureTotal() {
        return infrastructureTotal;
    }

    public void setInfrastructureTotal(BigDecimal infrastructureTotal) {
        this.infrastructureTotal = infrastructureTotal;
    }

    public BigDecimal getSupportTotal() {
        return supportTotal;
    }

    public void setSupportTotal(BigDecimal supportTotal) {
        this.supportTotal = supportTotal;
    }

    public BigDecimal getGrandTotal() {
        return grandTotal;
    }

    public void setGrandTotal(BigDecimal grandTotal) {
        this.grandTotal = grandTotal;
    }

    public Integer getExternalSoftwareScore() {
        return externalSoftwareScore;
    }

    public void setExternalSoftwareScore(Integer externalSoftwareScore) {
        this.externalSoftwareScore = externalSoftwareScore;
    }

    public Integer getSoftwareUpgradeScore() {
        return softwareUpgradeScore;
    }

    public void setSoftwareUpgradeScore(Integer softwareUpgradeScore) {
        this.softwareUpgradeScore = softwareUpgradeScore;
    }

    public Integer getLabourScore() {
        return labourScore;
    }

    public void setLabourScore(Integer labourScore) {
        this.labourScore = labourScore;
    }

    public Integer getInfrastructureScore() {
        return infrastructureScore;
    }

    public void setInfrastructureScore(Integer infrastructureScore) {
        this.infrastructureScore = infrastructureScore;
    }

    public Integer getSupportScore() {
        return supportScore;
    }

    public void setSupportScore(Integer supportScore) {
        this.supportScore = supportScore;
    }

    public Double getOverallScore() {
        return overallScore;
    }

    public void setOverallScore(Double overallScore) {
        this.overallScore = overallScore;
    }
}