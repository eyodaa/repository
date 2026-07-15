package com.enterprise.dashen_repository.application.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationAssessmentRequest {

    private Long applicationId;

    private Integer increaseValue;
    private Integer reachConsumers;
    private Integer reduceCosts;
    private Integer enhanceServices;
    private Integer governanceCompliance;

    private Integer securityCompliance;
    private Integer businessContinuity;
    private Integer maintainability;
    private Integer adaptability;
    private Integer interoperability;

    private Integer dataQuality;
    private Integer effectiveness;
    private Integer usability;
    private Integer satisfaction;

    private Integer totalCostOwnership;
}
