package com.enterprise.dashen_repository.BusinessProcess.business_process_entity;

import com.enterprise.dashen_repository.artifact.entity.Artifact;
import com.enterprise.dashen_repository.artifact.entity.ArtifactType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "business_process")
public class BusinessProcess extends Artifact {

    @Column(nullable = false)
    private String owner;

    private String processLevel;

    private String criticality;

    private String status;

    private String automationLevel;

    @Column(columnDefinition = "TEXT")
    private String documentation;

    public BusinessProcess() {
        setArtifactType(ArtifactType.PROCESS);
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getProcessLevel() {
        return processLevel;
    }

    public void setProcessLevel(String processLevel) {
        this.processLevel = processLevel;
    }

    public String getCriticality() {
        return criticality;
    }

    public void setCriticality(String criticality) {
        this.criticality = criticality;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAutomationLevel() {
        return automationLevel;
    }

    public void setAutomationLevel(String automationLevel) {
        this.automationLevel = automationLevel;
    }

    public String getDocumentation() {
        return documentation;
    }

    public void setDocumentation(String documentation) {
        this.documentation = documentation;
    }
}