package com.enterprise.dashen_repository.technology.technology_service;

import com.enterprise.dashen_repository.technology.technology_entity.Technology;
import com.enterprise.dashen_repository.technology.technology_repository.TechnologyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechnologyService {

    private final TechnologyRepository technologyRepository;

    public TechnologyService(TechnologyRepository technologyRepository) {
        this.technologyRepository = technologyRepository;
    }

    // Create
    public Technology save(Technology technology) {
        return technologyRepository.save(technology);
    }

    // Read All
    public List<Technology> findAll() {
        return technologyRepository.findAll();
    }

    // Read One
    public Technology findById(Long id) {
        return technologyRepository.findById(id).orElse(null);
    }

    // Update
    public Technology update(Long id, Technology technology) {

        Technology existing = technologyRepository.findById(id).orElse(null);

        if (existing == null) {
            return null;
        }

        if (technology.getCode() != null)
            existing.setCode(technology.getCode());
        if (technology.getName() != null)
            existing.setName(technology.getName());
        if (technology.getDescription() != null)
            existing.setDescription(technology.getDescription());
        if (technology.getTechnologyType() != null)
            existing.setTechnologyType(technology.getTechnologyType());
        if (technology.getVendor() != null)
            existing.setVendor(technology.getVendor());
        if (technology.getProductName() != null)
            existing.setProductName(technology.getProductName());
        if (technology.getVersion() != null)
            existing.setVersion(technology.getVersion());
        if (technology.getDeploymentModel() != null)
            existing.setDeploymentModel(technology.getDeploymentModel());
        if (technology.getPlatform() != null)
            existing.setPlatform(technology.getPlatform());
        if (technology.getLicenseType() != null)
            existing.setLicenseType(technology.getLicenseType());
        if (technology.getLifecycleStatus() != null)
            existing.setLifecycleStatus(technology.getLifecycleStatus());
        if (technology.getSupportStatus() != null)
            existing.setSupportStatus(technology.getSupportStatus());
        if (technology.getEndOfSupportDate() != null)
            existing.setEndOfSupportDate(technology.getEndOfSupportDate());
        if (technology.getEndOfLifeDate() != null)
            existing.setEndOfLifeDate(technology.getEndOfLifeDate());
        if (technology.getOwner() != null)
            existing.setOwner(technology.getOwner());
        if (technology.getSupportGroup() != null)
            existing.setSupportGroup(technology.getSupportGroup());
        if (technology.getWebsite() != null)
            existing.setWebsite(technology.getWebsite());
        if (technology.getDocumentation() != null)
            existing.setDocumentation(technology.getDocumentation());

        return technologyRepository.save(existing);
    }

    // Delete
    public void delete(Long id) {
        technologyRepository.deleteById(id);
    }
}