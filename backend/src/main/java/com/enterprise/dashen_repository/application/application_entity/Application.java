package com.enterprise.dashen_repository.application.application_entity;

import com.enterprise.dashen_repository.artifact.entity.Artifact;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "application")
public class Application extends Artifact {

    // ==========================
    // BUSINESS INFORMATION
    // ==========================

    private String function;

    private String businessOwner;

    private String technicalOwner;

    private String businessCriticality;
    private String department;

    // ==========================
    // APPLICATION INFORMATION
    // ==========================

    private String vendor;

    private String version;

    private String applicationType;

    private String deploymentModel;

    private String hostingLocation;

    // ==========================
    // TECHNICAL INFORMATION
    // ==========================

    private String technologyStack;

    private String databaseTechnology;

    private String operatingSystem;

    private String authenticationMethod;

    // ==========================
    // OPERATIONS
    // ==========================

    private String lifecycleStatus;

    private String supportGroup;

    private String environment;

    // ==========================
    // REFERENCES
    // ==========================

    private String url;

    @Column(columnDefinition = "TEXT")
    private String documentation;

    // ==========================
    // LIFECYCLE DATES
    // ==========================

    private LocalDate goLiveDate;

    private LocalDate retirementDate;

    public Application() {
    }

    // ==========================
    // GETTERS & SETTERS
    // ==========================

    public String getFunction() {
        return function;
    }

    public void setFunction(String function) {
        this.function = function;
    }

    public String getBusinessOwner() {
        return businessOwner;
    }

    public void setBusinessOwner(String businessOwner) {
        this.businessOwner = businessOwner;
    }

    public String getTechnicalOwner() {
        return technicalOwner;
    }

    public void setTechnicalOwner(String technicalOwner) {
        this.technicalOwner = technicalOwner;
    }

    public String getBusinessCriticality() {
        return businessCriticality;
    }

    public void setBusinessCriticality(String businessCriticality) {
        this.businessCriticality = businessCriticality;
    }

    public String getVendor() {
        return vendor;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getApplicationType() {
        return applicationType;
    }

    public void setApplicationType(String applicationType) {
        this.applicationType = applicationType;
    }

    public String getDeploymentModel() {
        return deploymentModel;
    }

    public void setDeploymentModel(String deploymentModel) {
        this.deploymentModel = deploymentModel;
    }

    public String getHostingLocation() {
        return hostingLocation;
    }

    public void setHostingLocation(String hostingLocation) {
        this.hostingLocation = hostingLocation;
    }

    public String getTechnologyStack() {
        return technologyStack;
    }

    public void setTechnologyStack(String technologyStack) {
        this.technologyStack = technologyStack;
    }

    public String getDatabaseTechnology() {
        return databaseTechnology;
    }

    public void setDatabaseTechnology(String databaseTechnology) {
        this.databaseTechnology = databaseTechnology;
    }

    public String getOperatingSystem() {
        return operatingSystem;
    }

    public void setOperatingSystem(String operatingSystem) {
        this.operatingSystem = operatingSystem;
    }

    public String getAuthenticationMethod() {
        return authenticationMethod;
    }

    public void setAuthenticationMethod(String authenticationMethod) {
        this.authenticationMethod = authenticationMethod;
    }

    public String getLifecycleStatus() {
        return lifecycleStatus;
    }

    public void setLifecycleStatus(String lifecycleStatus) {
        this.lifecycleStatus = lifecycleStatus;
    }

    public String getSupportGroup() {
        return supportGroup;
    }

    public void setSupportGroup(String supportGroup) {
        this.supportGroup = supportGroup;
    }

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDocumentation() {
        return documentation;
    }

    public void setDocumentation(String documentation) {
        this.documentation = documentation;
    }

    public LocalDate getGoLiveDate() {
        return goLiveDate;
    }

    public void setGoLiveDate(LocalDate goLiveDate) {
        this.goLiveDate = goLiveDate;
    }

    public LocalDate getRetirementDate() {
        return retirementDate;
    }

    public void setRetirementDate(LocalDate retirementDate) {
        this.retirementDate = retirementDate;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDepartment() {
        return department;
    }

}