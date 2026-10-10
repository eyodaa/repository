package com.enterprise.dashen_repository.BusinessProcess.business_process_entity;

import com.enterprise.dashen_repository.BusinessProcess.enums.AutomationLevel;
import com.enterprise.dashen_repository.BusinessProcess.enums.ProcessCategory;
import com.enterprise.dashen_repository.BusinessProcess.enums.ProcessCriticality;
import com.enterprise.dashen_repository.BusinessProcess.enums.ProcessLevel;
import com.enterprise.dashen_repository.BusinessProcess.enums.ProcessStatus;
import com.enterprise.dashen_repository.artifact.entity.Artifact;
import com.enterprise.dashen_repository.artifact.entity.ArtifactType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "business_process", indexes = {
        @Index(name = "idx_process_code", columnList = "processCode"),
        @Index(name = "idx_process_owner", columnList = "processOwner"),
        @Index(name = "idx_process_status", columnList = "status"),
        @Index(name = "idx_process_category", columnList = "category")
})
public class BusinessProcess extends Artifact {

    @NotBlank
    @Size(max = 50)
    @Column(nullable = false, unique = true, length = 50)
    private String processCode;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String processOwner;

    @Size(max = 100)
    @Column(length = 100)
    private String businessUnit;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProcessCategory category = ProcessCategory.CORE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProcessStatus status = ProcessStatus.DRAFT;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProcessCriticality criticality = ProcessCriticality.MEDIUM;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AutomationLevel automationLevel = AutomationLevel.MANUAL;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProcessLevel processLevel = ProcessLevel.LEVEL_1;

    @Size(max = 20)
    @Column(length = 20)
    private String version = "1.0";

    private LocalDate reviewDate;

    @Column(columnDefinition = "TEXT")
    private String documentation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_process_id")
    @JsonBackReference
    private BusinessProcess parentProcess;

    @OneToMany(mappedBy = "parentProcess", cascade = CascadeType.ALL, orphanRemoval = false)
    @JsonManagedReference
    private List<BusinessProcess> childProcesses = new ArrayList<>();

    public BusinessProcess() {
        setArtifactType(ArtifactType.PROCESS);
    }

    public String getProcessCode() {
        return processCode;
    }

    public void setProcessCode(String processCode) {
        this.processCode = processCode;
    }

    public String getProcessOwner() {
        return processOwner;
    }

    public void setProcessOwner(String processOwner) {
        this.processOwner = processOwner;
    }

    public String getBusinessUnit() {
        return businessUnit;
    }

    public void setBusinessUnit(String businessUnit) {
        this.businessUnit = businessUnit;
    }

    public ProcessCategory getCategory() {
        return category;
    }

    public void setCategory(ProcessCategory category) {
        this.category = category;
    }

    public ProcessStatus getStatus() {
        return status;
    }

    public void setStatus(ProcessStatus status) {
        this.status = status;
    }

    public ProcessCriticality getCriticality() {
        return criticality;
    }

    public void setCriticality(ProcessCriticality criticality) {
        this.criticality = criticality;
    }

    public AutomationLevel getAutomationLevel() {
        return automationLevel;
    }

    public void setAutomationLevel(AutomationLevel automationLevel) {
        this.automationLevel = automationLevel;
    }

    public ProcessLevel getProcessLevel() {
        return processLevel;
    }

    public void setProcessLevel(ProcessLevel processLevel) {
        this.processLevel = processLevel;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public LocalDate getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(LocalDate reviewDate) {
        this.reviewDate = reviewDate;
    }

    public String getDocumentation() {
        return documentation;
    }

    public void setDocumentation(String documentation) {
        this.documentation = documentation;
    }

    public BusinessProcess getParentProcess() {
        return parentProcess;
    }

    public void setParentProcess(BusinessProcess parentProcess) {
        this.parentProcess = parentProcess;
    }

    public List<BusinessProcess> getChildProcesses() {
        return childProcesses;
    }

    public void setChildProcesses(List<BusinessProcess> childProcesses) {
        this.childProcesses = childProcesses;
    }
}