package com.enterprise.dashen_repository.application.tco.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CreateTCOAssessmentRequest {

    private Long applicationId;

    private Integer assessmentYear;

    private String assessedBy;

    private String currency;

    private String notes;

    private List<CostItemRequest> costItems = new ArrayList<>();

    public CreateTCOAssessmentRequest() {
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

    public String getAssessedBy() {
        return assessedBy;
    }

    public void setAssessedBy(String assessedBy) {
        this.assessedBy = assessedBy;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<CostItemRequest> getCostItems() {
        return costItems;
    }

    public void setCostItems(List<CostItemRequest> costItems) {
        this.costItems = costItems;
    }
}