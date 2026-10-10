package com.enterprise.dashen_repository.BusinessProcess.business_dto;

import com.enterprise.dashen_repository.BusinessProcess.enums.*;

import java.time.LocalDate;
import java.util.List;

public class BusinessProcessResponse {

    private Long id;

    private String code;
    private String name;
    private String description;

    private String processCode;
    private String processOwner;
    private String businessUnit;

    private ProcessCategory category;
    private ProcessStatus status;
    private ProcessCriticality criticality;
    private AutomationLevel automationLevel;
    private ProcessLevel processLevel;

    private String version;
    private LocalDate reviewDate;
    private String documentation;

    private Long parentProcessId;
    private String parentProcessName;

    private List<ChildProcessResponse> childProcesses;

    public BusinessProcessResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Long getParentProcessId() {
        return parentProcessId;
    }

    public void setParentProcessId(Long parentProcessId) {
        this.parentProcessId = parentProcessId;
    }

    public String getParentProcessName() {
        return parentProcessName;
    }

    public void setParentProcessName(String parentProcessName) {
        this.parentProcessName = parentProcessName;
    }

    public List<ChildProcessResponse> getChildProcesses() {
        return childProcesses;
    }

    public void setChildProcesses(List<ChildProcessResponse> childProcesses) {
        this.childProcesses = childProcesses;
    }
}