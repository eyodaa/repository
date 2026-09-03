package com.enterprise.dashen_repository.application.tco.dto;

import java.util.List;

public class TCOAssessmentResponse {
    private Long id;
    private Long applicationId;
    private Integer assessmentYear;
    private String assessmentDate;
    private String currency;
    private String assessedBy;
    private String status;
    private String notes;
    private Double totalCost;
    private Double overallScore;
    private List<CostItemResponse> costItems;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public Integer getAssessmentYear() {
        return assessmentYear;
    }

    public void setAssessmentYear(Integer assessmentYear) {
        this.assessmentYear = assessmentYear;
    }

    public String getAssessmentDate() {
        return assessmentDate;
    }

    public void setAssessmentDate(String assessmentDate) {
        this.assessmentDate = assessmentDate;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getAssessedBy() {
        return assessedBy;
    }

    public void setAssessedBy(String assessedBy) {
        this.assessedBy = assessedBy;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    public Double getOverallScore() {
        return overallScore;
    }

    public void setOverallScore(Double overallScore) {
        this.overallScore = overallScore;
    }

    public List<CostItemResponse> getCostItems() {
        return costItems;
    }

    public void setCostItems(List<CostItemResponse> costItems) {
        this.costItems = costItems;
    }
}
