package com.enterprise.dashen_repository.technology.technology_entity;

import com.enterprise.dashen_repository.artifact.entity.Artifact;
import com.enterprise.dashen_repository.artifact.entity.ArtifactType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "technology")
public class Technology extends Artifact {

    // ==========================
    // CLASSIFICATION
    // ==========================

    private String technologyType;

    private String vendor;

    private String productName;

    private String version;

    // ==========================
    // DEPLOYMENT
    // ==========================

    private String deploymentModel;

    private String platform;

    private String licenseType;

    // ==========================
    // LIFECYCLE
    // ==========================

    private String lifecycleStatus;

    private String supportStatus;

    private LocalDate endOfSupportDate;

    private LocalDate endOfLifeDate;

    // ==========================
    // GOVERNANCE
    // ==========================

    private String owner;

    private String supportGroup;

    // ==========================
    // REFERENCES
    // ==========================

    private String website;

    @Column(columnDefinition = "TEXT")
    private String documentation;

    public Technology() {
        setArtifactType(ArtifactType.TECHNOLOGY);
    }

    public String getTechnologyType() {
        return technologyType;
    }

    public void setTechnologyType(String technologyType) {
        this.technologyType = technologyType;
    }

    public String getVendor() {
        return vendor;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getDeploymentModel() {
        return deploymentModel;
    }

    public void setDeploymentModel(String deploymentModel) {
        this.deploymentModel = deploymentModel;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getLicenseType() {
        return licenseType;
    }

    public void setLicenseType(String licenseType) {
        this.licenseType = licenseType;
    }

    public String getLifecycleStatus() {
        return lifecycleStatus;
    }

    public void setLifecycleStatus(String lifecycleStatus) {
        this.lifecycleStatus = lifecycleStatus;
    }

    public String getSupportStatus() {
        return supportStatus;
    }

    public void setSupportStatus(String supportStatus) {
        this.supportStatus = supportStatus;
    }

    public LocalDate getEndOfSupportDate() {
        return endOfSupportDate;
    }

    public void setEndOfSupportDate(LocalDate endOfSupportDate) {
        this.endOfSupportDate = endOfSupportDate;
    }

    public LocalDate getEndOfLifeDate() {
        return endOfLifeDate;
    }

    public void setEndOfLifeDate(LocalDate endOfLifeDate) {
        this.endOfLifeDate = endOfLifeDate;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getSupportGroup() {
        return supportGroup;
    }

    public void setSupportGroup(String supportGroup) {
        this.supportGroup = supportGroup;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getDocumentation() {
        return documentation;
    }

    public void setDocumentation(String documentation) {
        this.documentation = documentation;
    }
}