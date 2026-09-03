package com.enterprise.dashen_repository.application.application_service;

import com.enterprise.dashen_repository.application.application_entity.Application;
import com.enterprise.dashen_repository.application.application_repository.ApplicationRepository;
import org.springframework.stereotype.Service;
import com.enterprise.dashen_repository.application.tco.repository.TCOSummaryRepository;
import java.util.List;

import java.math.BigDecimal;

@Service
public class ApplicationService {

    private final ApplicationRepository repository;
    private final TCOSummaryRepository summaryRepository;

    public ApplicationService(
            ApplicationRepository repository,
            TCOSummaryRepository summaryRepository) {

        this.repository = repository;
        this.summaryRepository = summaryRepository;
    }

    public List<Application> findAll() {
        return repository.findAll();
    }

    public Application findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Application save(Application application) {
        return repository.save(application);
    }

    public Application update(Long id, Application application) {

        Application existing = repository.findById(id).orElse(null);

        if (existing == null) {
            return null;
        }

        // Identification
        existing.setCode(application.getCode());
        existing.setName(application.getName());
        existing.setDescription(application.getDescription());

        // Business Information
        existing.setFunction(application.getFunction());
        existing.setBusinessOwner(application.getBusinessOwner());
        existing.setTechnicalOwner(application.getTechnicalOwner());
        existing.setBusinessCriticality(application.getBusinessCriticality());
        existing.setDepartment(application.getDepartment());
        // Application Information
        existing.setVendor(application.getVendor());
        existing.setVersion(application.getVersion());
        existing.setApplicationType(application.getApplicationType());
        existing.setDeploymentModel(application.getDeploymentModel());
        existing.setHostingLocation(application.getHostingLocation());

        // Technical Information
        existing.setTechnologyStack(application.getTechnologyStack());
        existing.setDatabaseTechnology(application.getDatabaseTechnology());
        existing.setOperatingSystem(application.getOperatingSystem());
        existing.setAuthenticationMethod(application.getAuthenticationMethod());

        // Operations
        existing.setLifecycleStatus(application.getLifecycleStatus());
        existing.setSupportGroup(application.getSupportGroup());
        existing.setEnvironment(application.getEnvironment());

        // References
        existing.setUrl(application.getUrl());
        existing.setDocumentation(application.getDocumentation());

        // Dates
        existing.setGoLiveDate(application.getGoLiveDate());
        existing.setRetirementDate(application.getRetirementDate());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public BigDecimal getTotalApplicationCost() {
        return summaryRepository.getTotalApplicationCost();
    }
}