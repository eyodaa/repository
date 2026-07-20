package com.enterprise.dashen_repository.application.application_service;

import com.enterprise.dashen_repository.application.application_entity.ApplicationAssessment;
import org.springframework.stereotype.Service;

@Service
public class LensCalculationService {

    public double calculateOrganizationalValue(ApplicationAssessment a) {

        double weightedSum = a.getIncreaseValue() * 1 +
                a.getReachConsumers() * 1 +
                a.getReduceCosts() * 1 +
                a.getEnhanceServices() * 1 +
                a.getGovernanceCompliance() * 2;

        return weightedSum / 6.0;
    }

    public double calculateTechnicalHealth(ApplicationAssessment a) {

        double weightedSum = a.getSecurityCompliance() * 2 +
                a.getBusinessContinuity() * 2 +
                a.getMaintainability() * 1 +
                a.getAdaptability() * 1 +
                a.getInteroperability() * 1;

        return weightedSum / 7.0;
    }

    public double calculateEndUserPerspective(ApplicationAssessment a) {

        double weightedSum = a.getDataQuality() +
                a.getEffectiveness() +
                a.getUsability() +
                a.getSatisfaction();

        return weightedSum / 4.0;
    }

    public double calculateTCO(ApplicationAssessment a) {

        int license = a.getLicenseCost() == null ? 3 : a.getLicenseCost();
        int maintenance = a.getMaintenanceCost() == null ? 3 : a.getMaintenanceCost();
        int indirect = a.getIndirectCost() == null ? 3 : a.getIndirectCost();
        int other = a.getOtherCost() == null ? 3 : a.getOtherCost();

        return (license + maintenance + indirect + other) / 4.0;
    }
}
