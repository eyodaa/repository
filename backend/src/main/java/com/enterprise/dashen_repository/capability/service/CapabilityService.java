package com.enterprise.dashen_repository.capability.service;

import com.enterprise.dashen_repository.capability.entity.Capability;
import com.enterprise.dashen_repository.capability.repository_capability.CapabilityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CapabilityService {

    private final CapabilityRepository repository;

    public CapabilityService(CapabilityRepository repository) {
        this.repository = repository;
    }

    public List<Capability> findAll() {
        return repository.findAll();
    }

    public Capability findById(String code) {
        return repository.findById(code).orElse(null);
    }

    public Capability save(Capability capability) {
        return repository.save(capability);
    }

    public Capability update(String code, Capability capability) {

        Capability existing = repository.findById(code).orElse(null);

        if (existing == null) {
            return null;
        }

        existing.setName(capability.getName());
        existing.setDescription(capability.getDescription());
        existing.setParentId(capability.getParentId());
        existing.setMaturityLevel(capability.getMaturityLevel());
        existing.setTargetMaturity(capability.getTargetMaturity());

        return repository.save(existing);
    }

    public void delete(String code) {
        repository.deleteById(code);
    }

    public List<Capability> findChildren(String parentId) {
        return repository.findByParentId(parentId);
    }
}