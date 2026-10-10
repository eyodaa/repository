package com.enterprise.dashen_repository.application.tco.entity;

import com.enterprise.dashen_repository.application.application_entity.Application;
import com.enterprise.dashen_repository.application.tco.enums.AssessmentStatus;
import com.enterprise.dashen_repository.common.entity.BaseEntity;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "application_tco_assessment")

public class ApplicationTCOAssessment extends BaseEntity {
    @OneToMany(mappedBy = "assessment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TCOCostItem> costItems = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    @Column(name = "assessment_year", nullable = false)
    private Integer assessmentYear;

    @Column(nullable = false)
    private LocalDate assessmentDate;

    @Column(nullable = false, length = 10)
    private String currency = "USD";

    private String assessedBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssessmentStatus status = AssessmentStatus.DRAFT;

    @Column(columnDefinition = "TEXT")
    private String notes;

    public ApplicationTCOAssessment() {
        this.assessmentDate = LocalDate.now();
    }

    // ==========================
    // Getters & Setters
    // ==========================

    public Application getApplication() {
        return application;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public Integer getAssessmentYear() {
        return assessmentYear;
    }

    public void setAssessmentYear(Integer assessmentYear) {
        this.assessmentYear = assessmentYear;
    }

    public LocalDate getAssessmentDate() {
        return assessmentDate;
    }

    public void setAssessmentDate(LocalDate assessmentDate) {
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

    public AssessmentStatus getStatus() {
        return status;
    }

    public void setStatus(AssessmentStatus status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<TCOCostItem> getCostItems() {
        return costItems;
    }

    public void setCostItems(List<TCOCostItem> costItems) {
        this.costItems = costItems;
    }

}