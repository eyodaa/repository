package com.enterprise.dashen_repository.application.application_entity;

import com.enterprise.dashen_repository.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "application_assessment")
public class ApplicationAssessment extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false, unique = true)
    private Application application;

    // Organizational Value
    private Integer increaseValue;
    private Integer reachConsumers;
    private Integer reduceCosts;
    private Integer enhanceServices;
    private Integer governanceCompliance;

    // Technical Health
    private Integer securityCompliance;
    private Integer businessContinuity;
    private Integer maintainability;
    private Integer adaptability;
    private Integer interoperability;

    // End User
    private Integer dataQuality;
    private Integer effectiveness;
    private Integer usability;
    private Integer satisfaction;

    // Cost
    private Integer totalCostOwnership;

    public Application getApplication() {
        return application;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public Integer getIncreaseValue() {
        return increaseValue;
    }

    public void setIncreaseValue(Integer increaseValue) {
        this.increaseValue = increaseValue;
    }

    public Integer getReachConsumers() {
        return reachConsumers;
    }

    public void setReachConsumers(Integer reachConsumers) {
        this.reachConsumers = reachConsumers;
    }

    public Integer getReduceCosts() {
        return reduceCosts;
    }

    public void setReduceCosts(Integer reduceCosts) {
        this.reduceCosts = reduceCosts;
    }

    public Integer getEnhanceServices() {
        return enhanceServices;
    }

    public void setEnhanceServices(Integer enhanceServices) {
        this.enhanceServices = enhanceServices;
    }

    public Integer getGovernanceCompliance() {
        return governanceCompliance;
    }

    public void setGovernanceCompliance(Integer governanceCompliance) {
        this.governanceCompliance = governanceCompliance;
    }

    public Integer getSecurityCompliance() {
        return securityCompliance;
    }

    public void setSecurityCompliance(Integer securityCompliance) {
        this.securityCompliance = securityCompliance;
    }

    public Integer getBusinessContinuity() {
        return businessContinuity;
    }

    public void setBusinessContinuity(Integer businessContinuity) {
        this.businessContinuity = businessContinuity;
    }

    public Integer getMaintainability() {
        return maintainability;
    }

    public void setMaintainability(Integer maintainability) {
        this.maintainability = maintainability;
    }

    public Integer getAdaptability() {
        return adaptability;
    }

    public void setAdaptability(Integer adaptability) {
        this.adaptability = adaptability;
    }

    public Integer getInteroperability() {
        return interoperability;
    }

    public void setInteroperability(Integer interoperability) {
        this.interoperability = interoperability;
    }

    public Integer getDataQuality() {
        return dataQuality;
    }

    public void setDataQuality(Integer dataQuality) {
        this.dataQuality = dataQuality;
    }

    public Integer getEffectiveness() {
        return effectiveness;
    }

    public void setEffectiveness(Integer effectiveness) {
        this.effectiveness = effectiveness;
    }

    public Integer getUsability() {
        return usability;
    }

    public void setUsability(Integer usability) {
        this.usability = usability;
    }

    public Integer getSatisfaction() {
        return satisfaction;
    }

    public void setSatisfaction(Integer satisfaction) {
        this.satisfaction = satisfaction;
    }

    public Integer getTotalCostOwnership() {
        return totalCostOwnership;
    }

    public void setTotalCostOwnership(Integer totalCostOwnership) {
        this.totalCostOwnership = totalCostOwnership;
    }
}
