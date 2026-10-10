package com.enterprise.dashen_repository.application.tco.service;

import com.enterprise.dashen_repository.application.application_entity.ApplicationAssessment;
import com.enterprise.dashen_repository.application.application_repository.ApplicationAssessmentRepository;
import com.enterprise.dashen_repository.application.tco.entity.TCOSummary;
import org.springframework.stereotype.Service;

@Service
public class AssessmentSyncService {

        private final ApplicationAssessmentRepository repository;

        public AssessmentSyncService(
                        ApplicationAssessmentRepository repository) {

                this.repository = repository;
        }

        public void sync(ApplicationAssessment assessment,
                        TCOSummary summary) {

                assessment.setLicenseCost(
                                summary.getExternalSoftwareScore());

                assessment.setMaintenanceCost(
                                summary.getSoftwareUpgradeScore());

                int indirectAverage = (summary.getLabourScore()
                                + summary.getInfrastructureScore())
                                / 2;

                assessment.setIndirectCost(indirectAverage);

                assessment.setOtherCost(summary.getSupportScore());

                repository.save(assessment);
        }

}